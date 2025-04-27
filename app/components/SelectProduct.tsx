import { View, Text, Image } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import Checkbox from "expo-checkbox";
import { useState } from "react";
interface Product {
  _id: Id<"products">;
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[]; // Storage IDs from client uploads
  userId: Id<"users">;
  imageUrls: string[];
  sold: boolean;
  approved: boolean;
}
const Products = ({ item }: { item: Product }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={{ width: "100%", flex: 1, padding: 16 }}>
      <View
        style={{
          width: "100%",
        }}
      >
        <View className='flex-1 flex-row gap-4' style={{ width: "100%" }}>
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              style={{ margin: 8 }}
            />
            {item.images.map((uri, index) => (
              <Image
                style={{ borderRadius: 6 }}
                key={index}
                source={{ uri: item.imageUrls[index] }}
                accessibilityLabel={`Image for product"}`}
                width={64}
                height={64}
              />
            ))}
            <View
              style={{
                flexDirection: "column",
                gap: 12,
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{ fontWeight: "700", fontSize: 14 }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 14, color: "grey" }}>
                ₹ {item.price}
              </Text>
            </View>
          </View>
          {/* <Ionicons name='ellipsis-horizontal' size={24} color='grey' /> */}
        </View>
      </View>
    </View>
  );
};

export default Products;
