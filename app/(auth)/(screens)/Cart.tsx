import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
import React, { useContext } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "expo-router";
import { handleInitiatePayment } from "@/utils/InitiatePayment";
import { ThemeContext } from "@/providers/ThemeProvider";
import ProductList from "@/app/components/ProductList";
import { useCart } from "@/utils/Store";

const Page = () => {
  const { colors, theme } = useContext(ThemeContext);
  const cart = useCart((state) => state.cart);
  const cartCount = cart.length; // Assuming cart is an array of product dat

  const router = useRouter();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
        }}
      >
        <View
          style={{
            margin: 20,
          }}
        >
          <FlatList
            data={cart}
            renderItem={({ item }) => {
              return item && typeof item.brand === "string" ? (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <ProductList
                    icon='Trash'
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
              return (
                <Text
                  style={{
                    padding: 20,
                    fontSize: 16,
                    color: colors.text.secondary,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  No products
                </Text>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  marginHorizontal: 16,
                  borderColor: colors.background.border,
                }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
        {cartCount !== 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              shadowOpacity: 0.1,
              shadowRadius: 1,
              shadowOffset: { width: 0, height: -1 },
              shadowColor: colors.background.border,
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderTopWidth: 1,
              backgroundColor: colors.background.primary,
              borderColor: colors.background.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 15,
                    color: colors.text.secondary,
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: colors.text.primary,
                  }}
                >
                  ₹ {cart.reduce((acc, item) => acc + item.price, 0)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleInitiatePayment({
                    amount: cart
                      .reduce((acc, item) => acc + item.price, 0)
                      .toString(),
                  });
                }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: colors.background.primary,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  borderColor: colors.background.border,
                  borderWidth: 0.5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={require("@/assets/images/esewa.jpg")}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Pay with Esewa
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;
