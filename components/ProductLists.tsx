import { View, Text, Image } from "react-native";
import React from "react";

import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[]; // Storage IDs from client uploads
  userId: Id<"users">;
  imageUrls: string[];
}
const ProductLists = ({ item }: { item: Product }) => {
  return (
    <View
      style={{
        padding: 20,
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        gap: 12,
      }}
    >
      <View style={{ width: "100%" }}>
        <View className='flex flex-row gap-4' style={{ width: "100%" }}>
          <Image
            source={{
              uri: "https://instagram.fktm8-1.fna.fbcdn.net/v/t51.2885-19/358117467_944397653439649_1364734034357034666_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fktm8-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QEcGBXnnTgYLgaka8j1FfgPr5A8ZanAuwHaqCshC-GM1gTUEaJq0OYATlx_A1wqc9LZexWjiqFDSY1YmHldudCu&_nc_ohc=69i489ac7WYQ7kNvwEqTesT&_nc_gid=CED090a4YVjsuYjDX3qd8g&edm=AAZTMJEBAAAA&ccb=7-5&oh=00_AfFQzqUdewOHgjcNUWZISaIBC0PAGES7dW31u2yWXMABtQ&oe=6800290E&_nc_sid=49cb7f",
            }}
            width={40}
            height={40}
            style={{ borderRadius: 30 }}
          />
          <View style={{ flex: 1 }}>
            <View className='mb-10'>
              <Text style={{ fontWeight: "700", fontSize: 14 }}>
                {item.title}
              </Text>
              <Text style={{ fontWeight: "300", fontSize: 14 }}>
                {item.description}
              </Text>
            </View>
            {item.images.map((uri, index) => (
              <Image
                style={{ borderRadius: 10, marginTop: 16 }}
                key={index}
                source={{ uri: item.imageUrls[index] }}
                className='rounded-lg overflow-clip'
                accessibilityLabel={`Image for product"}`}
                width={200}
                height={200}
              />
            ))}
          </View>
          <Ionicons name='ellipsis-horizontal' size={24} color='grey' />
        </View>
      </View>
    </View>
  );
};

export default ProductLists;
