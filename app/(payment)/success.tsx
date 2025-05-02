import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ConfettiCannon from "react-native-confetti-cannon";
import { Button } from "react-native";
const SuccessPage: React.FC = () => {
  const { message, data } = useLocalSearchParams<{
    message: string;
    data: string;
  }>();
  const updateTransaction = useMutation(api.transactions.updateTransaction);

  const markAnyProductAsSold = useMutation(api.products.markAnyProductAsSold);

  const parsedData = data ? JSON.parse(data) : {};
  console.log(parsedData); // Add this line to log the parsedData object

  const updateTransactionStatus = async (
    transaction_uuid: string,
    status: "success" | "failed"
  ) => {
    updateTransaction({
      transaction_uuid,
      status,
    });
    const getTransaction = await useQuery(api.transactions.getTransactionById, {
      transaction_uuid: transaction_uuid,
    });
    getTransaction?.cartItems.forEach((productId: string) => {
      markAnyProductAsSold({
        productId: productId as Id<"products">,
      });
    });
  };
  if (parsedData.transaction_uuid) {
    updateTransactionStatus(parsedData.transaction_uuid, "success");
  }
  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <Text style={styles.title}>Payment Status</Text>
      <Text style={styles.message}>{message || "Payment Successful!"}</Text>
      <Text style={styles.details}>
        Transaction UUID: {parsedData.transaction_uuid || "N/A"}
      </Text>
      <Text style={styles.details}>
        Amount: {parsedData.total_amount || "N/A"}
      </Text>

      <Pressable
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => {
          router.replace("/");
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Back to Home
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "green",
  },
  details: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});

export default SuccessPage;
