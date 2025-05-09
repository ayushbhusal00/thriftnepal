import { View, Text, FlatList, Image } from "react-native";
import React, { useContext } from "react";
import { useFavourites } from "@/utils/Store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import Products from "@/app/components/ProductStatus";
import { Id } from "@/convex/_generated/dataModel";
import { ThemeContext } from "@/providers/ThemeProvider";
import ProductList from "@/app/components/ProductList";
import { Heart } from "phosphor-react-native";

const Page = () => {
  const { colors } = useContext(ThemeContext);
  const favouritesCount = useFavourites((state) => state.favouritesCount);
  const favourites = useFavourites((state) => state.favourites);

  // const { userProfile } = useUserProfile();
  // console.log("Favourites: ", favourites);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      <FlatList
        data={favourites}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View className='mx-6'>
              <ProductList
                icon='Heart'
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
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Image
                source={require("@/assets/images/favourites.png")}
                style={{ width: 200, height: 200 }}
              />
              <Text className='text-h2 font-dmsans text-center'>
                Favorites are empty for now
              </Text>
              <Text
                className='text-paragraph-1 font-dmsans text-center'
                style={{ color: colors.text.secondary }}
              >
                Save items here to let people know they're favorites
              </Text>
            </View>
          );
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
