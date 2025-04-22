import { View, Text } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";

interface Product {
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[]; // Storage IDs from client uploads
  userId: Id<"users">;
  imageUrls: string[];
}

const ProductDetail = ({ item }: { item: Product }) => {
  return (
    <View>
      <Text>ProductDetail</Text>
    </View>
  );
};

export default ProductDetail;
