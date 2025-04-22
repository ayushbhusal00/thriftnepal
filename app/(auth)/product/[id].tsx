import { View, Text, Image, Pressable, Share } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { getProductById } from "@/convex/products";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  ChatTeardrop,
  Check,
  DotsThree,
  PencilSimpleLine,
  ShareFat,
  Trash,
} from "phosphor-react-native";

const Page = () => {
  const { id } = useLocalSearchParams(); // Extracts the `id` from the route
  console.log(id); // Prints the `id` to the console
  const product = useQuery(api.products.getProductById, {
    productId: id as Id<"products">,
  });
  console.log(product); // Prints the `product` to the console
  return (
    <View>
      <Image
        source={{ uri: product?.imageUrls[0] }}
        style={{ width: "100%", height: 200 }}
      />
      <View className='m-5 flex-col gap-4'>
        <View className='flex-col gap-2 justify-between'>
          <Text className='text-md font-medium color-neutral-500'>
            Product Title:
          </Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?.title}
          </Text>
        </View>
        <View className='flex-col gap-2 justify-between'>
          <Text className='text-md font-medium color-neutral-500'>Price:</Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?.price}
          </Text>
        </View>
        <View className='flex-col gap-2 justify-between'>
          <Text className='text-md font-medium color-neutral-500'>
            Posted on:
          </Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?._creationTime}
          </Text>
        </View>

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
          <Text style={{ color: "#572B49", fontWeight: "700" }}>Sold</Text>
        </Pressable>
      </View>
      <View className='flex-row justify-between mx-5'>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
          onPress={() => console.log("Sold Offline")}
        >
          <View className='flex-col gap-4 items-center'>
            <View
              style={{
                backgroundColor: "#DFEDF4",
                padding: 16,
                borderRadius: 99,
              }}
            >
              <PencilSimpleLine size={32} color='#314B57' weight='duotone' />
            </View>
            <Text style={{ color: "#314B57", fontWeight: "700" }}>Edit</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
          onPress={() => console.log("Sold Offline")}
        >
          <View className='flex-col gap-4 items-center'>
            <View
              style={{
                backgroundColor: "#DFEDF4",
                padding: 16,
                borderRadius: 99,
              }}
            >
              <Trash size={32} color='#314B57' weight='duotone' />
            </View>
            <Text style={{ color: "#314B57", fontWeight: "700" }}>Delete</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
          onPress={() => console.log("Sold Offline")}
        >
          <View className='flex-col gap-4 items-center'>
            <View
              style={{
                backgroundColor: "#DFEDF4",
                padding: 16,
                borderRadius: 99,
              }}
            >
              <ShareFat size={32} color='#314B57' weight='duotone' />
            </View>
            <Text style={{ color: "#314B57", fontWeight: "700" }}>Share</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
          onPress={() => console.log("Sold Offline")}
        >
          <View className='flex-col gap-4 items-center'>
            <View
              style={{
                backgroundColor: "#DFEDF4",
                padding: 16,
                borderRadius: 99,
              }}
            >
              <ChatTeardrop size={32} color='#314B57' weight='duotone' />
            </View>
            <Text style={{ color: "#314B57", fontWeight: "700" }}>Chat</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Page;
