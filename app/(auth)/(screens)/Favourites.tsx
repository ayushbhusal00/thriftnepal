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
      className='flex-1'
      style={{ backgroundColor: colors.background.primary }}
    >
      <FlatList
        data={favourites}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View
              className={`bg-[${colors.background.secondary}] rounded-lg border-1 border-[${colors.background.border}] mx-4 `}
            >
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
              }}
            >
              <Image
                source={require("@/assets/images/illustrations/no-wishlist.png")}
                style={{ width: 200, height: 200 }}
              />
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
