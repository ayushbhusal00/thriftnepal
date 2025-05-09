import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { Heart, Trash } from "phosphor-react-native";
import { useCart, useFavourites } from "@/utils/Store";
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
const ProductList = ({
  item,
  icon,
}: {
  item: Product;
  icon: "Heart" | "Trash";
}) => {
  const { colors, theme } = useContext(ThemeContext);
  const { removeFavourites, addFavourites, favourites } = useFavourites();
  const removeFavourite = useFavourites((state) => state.removeFavourites);
  const removeFromCart = useCart((state) => state.removeCart);
  const isFavourite = favourites.some((product) => product._id === item._id);
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 0.25,
        borderColor: colors.background.border,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.41,
        backgroundColor:
          theme === "light"
            ? colors.background.secondary
            : colors.background.secondary,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
              padding: 16,
            }}
          >
            {item.images.map((uri, index) => (
              <Image
                style={{ borderRadius: 6 }}
                key={index}
                source={{ uri: item.imageUrls[index] }}
                accessibilityLabel={`Image for product"}`}
                width={120}
                height={120}
              />
            ))}
            <View
              style={{
                flexDirection: "column",
                gap: 4,
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: colors.text.primary,
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  color: colors.text.primary,
                }}
                numberOfLines={2}
              >
                {item.brand}
              </Text>

              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: colors.text.green,
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                ₹ {item.price}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Pressable
                  onPress={() => {
                    isFavourite
                      ? removeFavourites(item._id)
                      : addFavourites({
                          ...item,
                          category: "",
                          size: "",
                          condition: "",
                        });
                  }}
                >
                  <Heart
                    size={24}
                    color={colors.text.secondary}
                    weight={isFavourite ? "fill" : "regular"}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {
                    removeFromCart(item._id);
                  }}
                >
                  <Trash
                    size={24}
                    color={colors.text.secondary}
                    weight='regular'
                  />
                </Pressable>
              </View>
            </View>
            <Checkbox
              value={false}
              onValueChange={(value) => {}}
              color={colors.brand.default}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductList;
