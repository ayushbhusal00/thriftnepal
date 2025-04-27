import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import SelectProduct from "@/app/components/SelectProduct";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "expo-router";
import { handleInitiatePayment } from "@/utils/InitiatePayment";

const Page = () => {
  const cart = [
    {
      _id: "j977z4ydn48aswb39y986m1jrn7egpc6",
      imageUrls: [
        "https://combative-vulture-199.convex.cloud/api/storage/d1139fbe-5b92-45cd-adb2-28f985596e74",
      ],
      title: "Reebok Question Mid Yellow Toe",
      category: "Footwear",
      description:
        "A classic mid-top basketball shoe featuring a white leather upper, a yellow toe cap, and a gum rubber outsole. The design incorporates Reebok's vector logo and signature hexagonal cushioning.",
      size: "Regular",
      condition: "New",
      price: 18000,
      approved: true,
      brand: "Reebok",
      fabrics:
        "Leather (upper), Rubber (outsole), Synthetic materials (lining and details), Textile (laces)",
      highlights:
        "The shoe's key features include its iconic design, the contrasting yellow toe cap, Reebok's hexagonal cushioning for shock absorption, and the durable gum rubber outsole for traction on and off the court. ",
      userId: "jd75bzy14qcdncbd2c714nrcrn7eayca",
      images: ["kg26tfz0pjk3k5m5psgnscsz6x7ehb08"],
      sold: false,
    },
  ];
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={cart}
          renderItem={({ item }) => {
            return item && typeof item.brand === "string" ? (
              <View style={styles.productContainer}>
                <SelectProduct
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
            return <Text style={styles.emptyText}>No products</Text>;
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: 400, fontSize: 15 }}>Total</Text>
              <Text style={{ fontWeight: 700, fontSize: 18 }}>
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
              style={[styles.button, styles.greenButton]}
            >
              <View style={styles.innerShadow} />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("@/assets/images/esewa.png")}
                  style={{ width: 40, height: 40 }}
                />
                <Text style={styles.whiteText}>Pay with Esewa</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 100, // Space for the footer
  },
  productContainer: {
    backgroundColor: "#fff",
  },
  emptyText: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: "#ccc",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  greenButton: {
    backgroundColor: "#3cc750",
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(30, 106, 42, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  whiteText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
