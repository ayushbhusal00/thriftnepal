import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ConfettiCannon from "react-native-confetti-cannon";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useCart } from "@/utils/Store";

const SuccessPage: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { message, data } = useLocalSearchParams<{
    message: string;
    data: string;
  }>();
  const updateTransaction = useMutation(api.transactions.updateTransaction);
  const markAnyProductAsSold = useMutation(api.products.markAnyProductAsSold);
  const removeCartItem = useCart((state) => state.removeCart);

  const parsedData = data ? JSON.parse(data) : {};
  console.log("Parsed Data:", parsedData);

  const updateTransactionStatus = async (
    transaction_uuid: string,
    status: "success" | "failed",
    cartItems: string[]
  ) => {
    try {
      await updateTransaction({
        transaction_uuid,
        status,
      });
      console.log("Transaction updated:", transaction_uuid);

      for (const productId of cartItems) {
        await markAnyProductAsSold({
          productId: productId as Id<"products">,
        });
        removeCartItem(productId);
        console.log("Removed from cart and marked sold:", productId);
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  useEffect(() => {
    if (parsedData.transaction_uuid) {
      updateTransactionStatus(
        parsedData.transaction_uuid,
        "success",
        [] // Provide an empty array if cartItems is not available
      );
    } else {
      console.error("Missing transaction_uuid:", parsedData);
    }
  }, [parsedData]);

  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut={true}
        autoStart={true}
        explosionSpeed={350}
        fallSpeed={3000}
      />
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Payment Status
      </Text>
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {message || "Payment Successful!"}
      </Text>
      <Text style={[styles.details, { color: colors.text.secondary }]}>
        Transaction UUID: {parsedData.transaction_uuid || "N/A"}
      </Text>
      <Text style={[styles.details, { color: colors.text.secondary }]}>
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
