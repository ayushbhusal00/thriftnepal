import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Check,
  Hourglass,
  PencilSimpleLine,
  TrashSimple,
} from "phosphor-react-native";

const Page = () => {
  const { id } = useLocalSearchParams(); // Extracts the `id` from the route
  // console.log(id); // Prints the `id` to the console
  const product = useQuery(api.products.getProductById, {
    productId: id as Id<"products">,
  });
  console.log(product); // Prints the `product` to the console
  return (
    <ScrollView>
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
        {product?.approved ? (
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
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
              <Text style={{ color: "#572B49", fontWeight: "700" }}>Sold</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#DFEDF4",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
              onPress={() => console.log("Make Changes")}
            >
              <PencilSimpleLine size={20} color='#314B57' />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#F5DAE4",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
              onPress={() => console.log("Delete")}
            >
              <TrashSimple size={20} color='#7C3751' />
            </Pressable>
          </View>
        ) : (
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Pressable
              style={{
                backgroundColor: "#F4EEDF",
                paddingHorizontal: 16,
                paddingVertical: 12,
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
            <Pressable
              style={{
                backgroundColor: "#DFEDF4",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
              onPress={() => console.log("Make Changes")}
            >
              <PencilSimpleLine size={20} color='#314B57' />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#F5DAE4",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
              onPress={() => console.log("Delete")}
            >
              <TrashSimple size={20} color='#7C3751' />
            </Pressable>
          </View>
        )}
      </View>
      {/* Add descriptions and product details here */}
      <View style={{ margin: 20, flexDirection: "column", gap: 16 }}>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text className='text-md font-medium color-neutral-500'>
            Description:
          </Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?.description}
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text className='text-md font-medium color-neutral-500'>
            Product Highlights:
          </Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?.highlights}
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text className='text-md font-medium color-neutral-500'>
            Product Material:
          </Text>
          <Text className='text-md font-medium color-neutral-900'>
            {product?.fabrics}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
