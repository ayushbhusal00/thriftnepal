import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ThemeContext } from "@/providers/ThemeProvider";

const FailurePage: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { message, data } = useLocalSearchParams<{
    message: string;
    data: string;
  }>();
  const updateTransaction = useMutation(api.transactions.updateTransaction);
  const parsedData = data ? JSON.parse(data) : {};
  console.log(parsedData); // Add this line to log the parsedData object

  const updateTransactionStatus = (
    transaction_uuid: string,
    status: "success" | "failed"
  ) => {
    updateTransaction({
      transaction_uuid,
      status,
    });
  };

  updateTransactionStatus(parsedData.transaction_uuid, "failed");

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          textAlign: "center",
          color: colors.text.primary,
        }}
      >
        Payment Status
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          textAlign: "center",
          color: "red",
        }}
      >
        {message || "Payment Failed!"}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          textAlign: "center",
          color: colors.text.secondary,
        }}
      >
        Transaction UUID: {parsedData.transaction_uuid || "N/A"}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          textAlign: "center",
          color: colors.text.secondary,
        }}
      >
        Reason: {parsedData.reason || "Unknown error"}
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
  details: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});

export default FailurePage;
