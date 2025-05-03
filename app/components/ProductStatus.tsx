import { View, Text, Image, Button, Pressable } from "react-native";
import React, { useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import {
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
  const { colors } = useContext(ThemeContext);
  const removeFavourite = useFavourites((state) => state.removeFavourites);
  const removeFromCart = useCart((state) => state.removeCart);
  return (
    <View
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
        backgroundColor: colors.background.primary,
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
            <View style={{ position: "relative" }}>
              {item.images.map((uri, index) => (
                <Image
                  style={{ borderRadius: 10 }}
                  key={index}
                  source={{ uri: item.imageUrls[index] }}
                  accessibilityLabel={`Image for product"}`}
                  width={80}
                  height={62}
                />
              ))}
              {item.approved && (
                <View
                  style={{
                    width: 16,
                    height: 16,
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
                gap: 12,
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
            </View>
          </View>
          <View
            style={{
              borderTopColor: colors.background.border,
              borderTopWidth: 0.25,
              paddingVertical: 24,
              paddingHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: colors.text.primary,
              }}
            >
              ₹ {item.price}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                justifyContent: "flex-start",
              }}
            >
              {item.approved ? (
                <Pressable
                  style={{
                    backgroundColor: colors.background.primary,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "center",

                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 0.5,

                    borderColor: colors.background.border,
                    borderWidth: 0.25,
                  }}
                  onPress={() => console.log("Sold Offline")}
                >
                  <Check size={20} color={colors.text.secondary} />
                  <Text
                    style={{ color: colors.text.primary, fontWeight: "600" }}
                  >
                    Mark as Sold
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    backgroundColor: colors.background.primary,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 0.5,

                    borderColor: colors.background.border,
                    borderWidth: 0.25,
                  }}
                  onPress={() => console.log("Sold Online")}
                >
                  <Hourglass size={20} color={colors.text.secondary} />
                  <Text
                    style={{ color: colors.text.primary, fontWeight: "600" }}
                  >
                    Awaiting review
                  </Text>
                </Pressable>
              )}
              <Pressable
                style={{
                  backgroundColor: colors.background.primary,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 0.5,

                  borderColor: colors.background.border,
                  borderWidth: 0.25,
                }}
                onPress={() => console.log("Share in Story")}
              >
                <ShareFat size={20} color='#314B57' />
              </Pressable>
            </View>
            ;
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductStatus;
