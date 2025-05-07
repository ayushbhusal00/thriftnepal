import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Heart } from "phosphor-react-native";
import { router } from "expo-router";
import { useCart, useFavourites } from "@/utils/Store";
import { themes } from "@/utils/color-theme";
import { ThemeContext } from "@/providers/ThemeProvider";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  userId: Id<"users">;
  imageUrls: string[];
  category: string;
  size: string;
  condition: string;
  approved: boolean;
  sold: boolean;
  _creationTime: Date | number;
}

const ProductFeed = ({ item }: { item: Product }) => {
  const { theme, colors } = useContext(ThemeContext);
  const { removeFavourites, addFavourites, favourites } = useFavourites();
  const { addCart } = useCart();
  const user = useQuery(api.users.getUserById, { userId: item.userId });

  const isFavourite = favourites.some((product) => product._id === item._id);

  const addProductToFavourites = () => {
    addFavourites({ ...item });
  };

  return (
    <Pressable
      accessibilityRole='button'
      accessibilityLabel={`View details for ${item.title}`}
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
      onPress={() => {
        router.push(`/product/${item._id}`);
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <View style={{ width: "100%" }}>
          <View className='flex flex-col gap-4' style={{ width: "100%" }}>
            <View
              style={{
                flex: 1,
                gap: 12,
                borderRadius: 12,
                position: "relative",
              }}
            >
              {item.imageUrls?.length > 0 && (
                <View>
                  <Image
                    style={{
                      borderRadius: 10,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor:
                        theme === "light"
                          ? themes.light.background.primary
                          : themes.dark.background.primary,
                    }}
                    source={{ uri: item.imageUrls[0] }}
                    className='rounded-lg overflow-clip w-full'
                    accessibilityLabel={`Image for product ${item.title}`}
                    height={200}
                  />
                  <Pressable
                    accessibilityRole='button'
                    accessibilityLabel={
                      isFavourite
                        ? `Remove ${item.title} from favourites`
                        : `Add ${item.title} to favourites`
                    }
                    onPress={() =>
                      isFavourite
                        ? removeFavourites(item._id)
                        : addProductToFavourites()
                    }
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Heart
                      size={24}
                      color={
                        isFavourite ? colors.brand.default : colors.text.onColor
                      }
                      weight={isFavourite ? "fill" : "duotone"}
                    />
                  </Pressable>
                </View>
              )}

              {item.sold && (
                <View
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "black",
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    Sold
                  </Text>
                </View>
              )}
            </View>

            <View className='flex-row justify-center items-center'>
              <View className='flex-col flex-1 gap-2'>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 14,
                    color:
                      theme === "light"
                        ? themes.light.text.primary
                        : themes.dark.text.primary,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color:
                      theme === "light"
                        ? themes.light.brand.text
                        : themes.dark.brand.text,
                  }}
                >
                  ₹ {item.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductFeed;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  cartButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
