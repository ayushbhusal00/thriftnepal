import { View, Text, Image, Button, Pressable } from "react-native";
import React, { useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import {
  CaretRight,
  Check,
  Heart,
  Hourglass,
  ShareFat,
  Trash,
} from "phosphor-react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/providers/ThemeProvider";
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
const ProductStatus = ({ item }: { item: Product }) => {
  const router = useRouter();
  // console.log(item.title, item.sold, item.approved);
  const { theme, colors } = useContext(ThemeContext);
  const removeFavourite = useFavourites((state) => state.removeFavourites);
  const removeFromCart = useCart((state) => state.removeCart);
  return (
    <Pressable
      onPress={() => {
        router.push(`/product/${item._id}`);
      }}
      style={{
        width: "100%",
        flex: 1,
        marginBottom: 16,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: colors.background.border,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 0.5,
        backgroundColor:
          theme === "light"
            ? colors.background.primary
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
            <View
              style={{
                position: "relative",
              }}
            >
              {item.images.map((uri, index) => (
                <Image
                  style={{ borderRadius: 6 }}
                  key={index}
                  source={{ uri: item.imageUrls[index] }}
                  accessibilityLabel={`Image for product"}`}
                  width={52}
                  height={52}
                />
              ))}
              {item.approved && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    backgroundColor: "green",
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "column",
                gap: 2,
                width: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 14,
                  color: colors.text.primary,
                }}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: colors.text.primary,
                }}
              >
                ₹ {item.price}
              </Text>
            </View>
            <CaretRight size={20} color={colors.text.secondary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductStatus;
