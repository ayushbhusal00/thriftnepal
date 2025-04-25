import { View, Text, FlatList } from "react-native";
import React from "react";
import { useFavourites } from "@/utils/Store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import Products from "@/components/Products";
import { Id } from "@/convex/_generated/dataModel";

const Page = () => {
  const favouritesCount = useFavourites((state) => state.favouritesCount);
  const favourites = useFavourites((state) => state.favourites);
  // const { userProfile } = useUserProfile();
  // console.log("Favourites: ", favourites);

  return (
    <SafeAreaView>
      <View className='px-5'>
        <Text className='text-md font-regular color-neutral-500 mb-4'>
          {favouritesCount} Favourite item
        </Text>
      </View>
      <FlatList
        data={favourites}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View className='bg-white rounded-lg border-1 border-[#00000020] mx-4 '>
              <Products
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
