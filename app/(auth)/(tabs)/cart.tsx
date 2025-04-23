import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { useCart } from "@/utils/Store";
import Products from "@/components/Products";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "expo-router";
import { handleInitiatePayment } from "@/utils/InitiatePayment";
const Page = () => {
  const { cart, cartCount } = useCart();
  const router = useRouter();
  console.log(cart);
  return (
    <SafeAreaView>
      <FlatList
        data={cart}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View className='bg-white rounded-lg border-1 border-[#00000020] mx-4 '>
              <Products
                item={{
                  ...item,
                  _id: item._id as Id<"products">,
                  userId: item.userId as Id<"users">,
                  brand: item.brand || "",
                }}
              />
            </View>
          ) : null;
        }}
        ListEmptyComponent={() => {
          return <Text className='px-5'>No products</Text>;
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              marginHorizontal: 16,
              backgroundColor: "#ccc",
            }}
          />
        )}
        ListFooterComponent={() => {
          return (
            <View className='mx-5 flex-row justify-between items-center px-5 py-3 bg-[#00CED1] rounded-lg mt-3 mb-10'>
              <Text className='text-white text-lg font-bold'>
                Total: ₹ {cart.reduce((acc, item) => acc + item.price, 0)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleInitiatePayment({
                    amount: cart
                      .reduce((acc, item) => acc + item.price, 0)
                      .toString(),
                  });
                }}
                style={[styles.button, styles.blackButton]}
              >
                {/* Inner shadow overlay */}
                <View style={styles.innerShadow} />
                <View>
                  <Text style={styles.whiteText}>Continue to Payment</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  whiteButton: {
    backgroundColor: "#FFFFFF",
  },
  redButton: {
    backgroundColor: "#FF0000",
  },
  blackButton: {
    backgroundColor: "#1C2526",
  },
  iconButton: {
    padding: 10, // Smaller padding for icon button
    width: 50, // Fixed width for square button
    height: 50, // Fixed height for square button
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  whiteText: {
    color: "#FFFFFF",
  },
  blackText: {
    color: "#000000",
  },
});
