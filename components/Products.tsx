import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { Check, ShareFat } from "phosphor-react-native";
import { useRouter } from "expo-router";

interface Product {
  _id: Id<"products">;
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[]; // Storage IDs from client uploads
  userId: Id<"users">;
  imageUrls: string[];
}
const Products = ({ item }: { item: Product }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{ width: "100%", flex: 1, padding: 16 }}
      onPress={() => {
        console.log("Pressed");
        router.push(`/product/${item._id}`);
      }}
    >
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
            {item.images.map((uri, index) => (
              <Image
                style={{ borderRadius: 10 }}
                key={index}
                source={{ uri: item.imageUrls[index] }}
                accessibilityLabel={`Image for product"}`}
                width={100}
                height={100}
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
              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                USD {item.price}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "flex-start",
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#E7D5E1",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "center",
                  }}
                  onPress={() => console.log("Sold Offline")}
                >
                  <Check size={20} color='#572B49' />
                  <Text style={{ color: "#572B49", fontWeight: "700" }}>
                    Sold
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#DFEDF4",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "center",
                  }}
                  onPress={() => console.log("Share in Story")}
                >
                  <ShareFat size={20} color='#314B57' />
                  <Text style={{ color: "#314B57", fontWeight: "700" }}>
                    Share
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Ionicons name='ellipsis-horizontal' size={24} color='grey' />
        </View>
      </View>
    </Pressable>
  );
};

export default Products;
