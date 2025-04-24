import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";

interface PaymentData {
  amount: string;
  failure_url: string;
  product_delivery_charge: string;
  product_service_charge: string;
  product_code: string;
  signed_field_names: string;
  success_url: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  signature: string;
}

const PaymentForm: React.FC = () => {
  const { userProfile } = useUserProfile();
  const { amount } = useLocalSearchParams<{ amount: string }>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addTransaction = useMutation(api.transactions.addTransaction);

  //addtransaction function
  // Define the type for cartItems as an array of strings (product IDs)
  const handleAddTransaction = ({
    transaction_uuid,
    cartItems,
    userId,
  }: {
    transaction_uuid: string;
    cartItems: string[]; // Changed from any[] to string[]
    userId: string;
  }) =>
    addTransaction({
      transaction_uuid: transaction_uuid,
      cartItems: cartItems.map((item) => item as Id<"products">), // Convert each item in array to Id<"products">
      userId: userId as Id<"users">,
      status: "pending",
    });

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleProceedToPayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid amount");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // TODO: need to make this address public
      const response = await axios.post<{ paymentData: PaymentData }>(
        "http://localhost:3000/initiate-payment",
        {
          amount,
          productId: generateUniqueId(),
        }
      );
      // Add to transactions table with product ID
      handleAddTransaction({
        transaction_uuid: response.data.paymentData.transaction_uuid,
        cartItems: ["j97b0kr4wtr08epcza5s9v73057ek8wt"], // Static product ID for now
        userId: userProfile?._id as string,
      });
      console.log("Response", response.data.paymentData);

      router.push({
        pathname: "/paymentWebview",
        params: { paymentData: JSON.stringify(response.data.paymentData) },
      });
    } catch (err) {
      setError("Error initiating payment");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm eSewa Payment</Text>
      <Text style={styles.amount}>Amount: NPR {amount}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={loading ? "Processing..." : "Proceed to Payment"}
        onPress={handleProceedToPayment}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  amount: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});

export default PaymentForm;
