import { View, Text, FlatList } from "react-native";
import React from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Products from "@/components/Products";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { userProfile } = useUserProfile();
  return (
    <SafeAreaView>
      <View className='px-5'>
        <Text className='text-md font-regular color-neutral-500 mb-4'>
          Your Listings
        </Text>
      </View>
      <FlatList
        data={useQuery(api.products.getMyProducts, {
          userId: userProfile?._id ?? ("" as Id<"users">),
        })}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View className='bg-white rounded-lg border-1 border-[#00000020] mx-4 '>
              <Products item={{ ...item }} />
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
      />
    </SafeAreaView>
  );
};

export default Page;
