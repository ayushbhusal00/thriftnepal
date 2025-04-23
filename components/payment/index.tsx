import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import axios from "axios";

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

const PaymentForm = () => {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const response = await axios.post<{ paymentData: PaymentData }>(
        "http://localhost:3000/initiate-payment",
        {
          amount,
          productId: generateUniqueId(),
        }
      );
      router.push({
        pathname: "/payment/webview",
        params: { paymentData: JSON.stringify(response.data.paymentData) },
      });
    } catch (err) {
      setError("Error initiating payment");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>eSewa Payment Test</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter amount'
        keyboardType='numeric'
        value={amount}
        onChangeText={setAmount}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title='Pay with eSewa' onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});

export default PaymentForm;
