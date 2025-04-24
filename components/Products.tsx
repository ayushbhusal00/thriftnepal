import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { Check, Hourglass, ShareFat } from "phosphor-react-native";
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
  sold: boolean;
  approved: boolean;
}
const Products = ({ item }: { item: Product }) => {
  const router = useRouter();
  // console.log(item.title, item.sold, item.approved);
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
            <View style={{ position: "relative" }}>
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
              {item.approved && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    backgroundColor: "green",
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                />
              )}
            </View>
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
                {item.approved ? (
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
                      flex: 1,
                    }}
                    onPress={() => console.log("Sold Offline")}
                  >
                    <Check size={20} color='#572B49' />
                    <Text style={{ color: "#572B49", fontWeight: "700" }}>
                      Mark as Sold
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: "#F4EEDF",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      justifyContent: "center",
                      flex: 1,
                    }}
                    onPress={() => console.log("Sold Online")}
                  >
                    <Hourglass size={20} color='#4F442B' />
                    <Text style={{ color: "#4F442B", fontWeight: "700" }}>
                      Awaiting review
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  style={{
                    backgroundColor: "#DFEDF4",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "center",
                  }}
                  onPress={() => console.log("Share in Story")}
                >
                  <ShareFat size={20} color='#314B57' />
                </Pressable>
              </View>
            </View>
          </View>
          {/* <Ionicons name='ellipsis-horizontal' size={24} color='grey' /> */}
        </View>
      </View>
    </Pressable>
  );
};

export default Products;
