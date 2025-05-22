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
  isSelected,
  onSelect,
}: {
  item: Product;
  icon: "Heart" | "Trash";
  isSelected?: boolean;
  onSelect?: () => void;
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
          flexDirection: "row",
          padding: 16,
          gap: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 16,
          }}
        >
          <Image
            source={{ uri: item.imageUrls[0] }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
            }}
          />
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text
              style={{
                color: colors.text.primary,
              }}
              className='text-paragraph-1 font-dmsans'
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
              }}
              className='text-paragraph-2 font-dmsans'
            >
              {item.brand}
            </Text>
            <Text
              style={{
                color: colors.text.primary,
              }}
              className='text-paragraph-1 font-dmsans'
            >
              ₹ {item.price}
            </Text>
          </View>
        </View>
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
            <Trash size={24} color={colors.text.secondary} weight='regular' />
          </Pressable>
        </View>
        {onSelect && (
          <Checkbox
            value={isSelected}
            onValueChange={onSelect}
            color={colors.brand.default}
          />
        )}
      </View>
    </View>
  );
};

export default ProductList;
