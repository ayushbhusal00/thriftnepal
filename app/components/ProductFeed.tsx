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
import { ChatTeardrop, Heart, ShareFat } from "phosphor-react-native";
import { router } from "expo-router";
import { useCart, useFavourites } from "@/utils/Store";
import { themes } from "@/utils/color-theme";
import { ThemeContext } from "@/providers/ThemeProvider";
import { formatDistanceToNow } from "date-fns";

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
  const { theme } = useContext(ThemeContext);
  const { removeFavourites, addFavourites, favourites } = useFavourites();
  const { addCart } = useCart();
  const user = useQuery(api.users.getUserById, { userId: item.userId });

  const isFavourite = favourites.some((product) => product._id === item._id);

  const addProductToFavourites = () => {
    addFavourites({ ...item });
  };

  const addItemToCart = () => {
    addCart({ ...item });
  };

  const creationTime =
    typeof item._creationTime === "number"
      ? new Date(item._creationTime)
      : item._creationTime;

  return (
    <Pressable
      accessibilityRole='button'
      accessibilityLabel={`View details for ${item.title}`}
      style={{
        width: "100%",
        flex: 1,
        backgroundColor:
          theme === "light"
            ? themes.light.background.secondary
            : themes.dark.background.secondary,
      }}
      onPress={() => {
        router.push(`/product/${item._id}`);
      }}
    >
      <View
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* User Profile Section */}
        {user && (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
              {user.imageUrl && (
                <Image
                  width={40}
                  height={40}
                  source={{ uri: user.imageUrl }}
                  className='w-10 h-10 rounded-full'
                  accessibilityLabel={`Profile picture for ${user.username}`}
                />
              )}
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color:
                      theme === "light"
                        ? themes.light.text.primary
                        : themes.dark.text.primary,
                  }}
                >
                  {user.username || "Anonymous"}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    color:
                      theme === "light"
                        ? themes.light.text.secondary
                        : themes.dark.text.secondary,
                  }}
                >
                  Posted {formatDistanceToNow(creationTime)} ago
                </Text>
              </View>
            </View>
          </View>
        )}

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
            <View className='flex-row'>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 12,
                }}
              >
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
                >
                  <Heart
                    size={24}
                    color={
                      isFavourite
                        ? themes.light.brand.default
                        : theme === "light"
                          ? themes.light.text.secondary
                          : themes.dark.text.secondary
                    }
                    weight={isFavourite ? "fill" : "regular"}
                  />
                </Pressable>
                <ChatTeardrop
                  size={24}
                  color={
                    theme === "light"
                      ? themes.light.text.secondary
                      : themes.dark.text.secondary
                  }
                />
                <ShareFat
                  size={24}
                  color={
                    theme === "light"
                      ? themes.light.text.secondary
                      : themes.dark.text.secondary
                  }
                />
              </View>
              {!item.sold && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    accessibilityRole='button'
                    accessibilityLabel={`Add ${item.title} to cart`}
                    onPress={addItemToCart}
                    style={[
                      styles.cartButton,
                      {
                        backgroundColor:
                          theme === "light"
                            ? themes.light.background.contrast
                            : themes.dark.background.contrast,
                      },
                    ]}
                  >
                    <View style={styles.innerShadow} />
                    <Text
                      style={{
                        color:
                          theme === "light"
                            ? themes.light.text.onColor
                            : themes.dark.text.onColor,
                      }}
                    >
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
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
                    fontWeight: "400",
                    fontSize: 14,
                    color:
                      theme === "light"
                        ? themes.light.text.secondary
                        : themes.dark.text.secondary,
                  }}
                >
                  Bags | {item.brand}
                </Text>
              </View>
              <View
                className='px-2 py-1'
                style={{
                  backgroundColor:
                    theme === "light"
                      ? themes.light.accent.interactive
                      : themes.dark.accent.interactive,
                  borderRadius: 4,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color:
                      theme === "light"
                        ? themes.light.accent.text
                        : themes.dark.accent.text,
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
