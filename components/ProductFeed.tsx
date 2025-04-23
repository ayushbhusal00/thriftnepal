import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  BookmarkSimple,
  ChatTeardrop,
  Heart,
  ShareFat,
  ShoppingCartSimple,
} from "phosphor-react-native";
import { router } from "expo-router";
import { useCart, useFavourites } from "@/utils/Store";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[]; // Storage IDs from client uploads
  userId: Id<"users">;
  imageUrls: string[];
  category: string;
  size: string;
  condition: string;
  approved: false;
}

const ProductFeed = ({ item }: { item: Product }) => {
  const { addFavourites, favourites } = useFavourites();
  const user = useQuery(api.users.getUserById, { userId: item.userId });

  const isFavourite = favourites.some((product) => product._id === item._id);

  const addProductToFavourites = () => {
    addFavourites({
      ...item,
    });
  };
  const { addCart } = useCart();
  const addItemToCart = () => {
    addCart({
      ...item,
    });
  };

  const imageUrl = user?.imageUrl;

  console.log("product item:", item);
  return (
    <Pressable
      style={{ width: "100%", flex: 1 }}
      onPress={() => {
        router.push(`/product/${item._id}`);
      }}
    >
      <View
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 12,
        }}
      >
        {/* Show user Details here */}

        <View style={{ width: "100%" }}>
          <View className='flex flex-col gap-4' style={{ width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
                {imageUrl && (
                  <Image
                    width={40}
                    height={40}
                    source={{
                      uri: imageUrl,
                    }}
                    className='w-10 h-10 rounded-full border border-gray-300'
                    accessibilityLabel={`Profile picture for ${item.title}`}
                  />
                )}
                <View>
                  <Text style={{ fontWeight: "700", fontSize: 14 }}>
                    {user?.username || "Anonymous"}
                  </Text>
                  <Text
                    style={{ fontWeight: "400", fontSize: 14, color: "grey" }}
                  >
                    Posted 5 days ago
                    {/* {item.createdAt.toLocaleDateString()} */}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                gap: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
              }}
            >
              {item.images.map((uri, index) => (
                <Image
                  style={{ borderRadius: 10 }}
                  key={index}
                  source={{ uri: item.imageUrls[index] }}
                  className='rounded-lg overflow-clip w-full'
                  accessibilityLabel={`Image for product ${item.title}`}
                  height={200}
                />
              ))}
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
                <Pressable onPress={addProductToFavourites}>
                  <Heart
                    size={24}
                    color={isFavourite ? "red" : "grey"}
                    weight={isFavourite ? "fill" : "regular"}
                  />
                </Pressable>
                <ChatTeardrop size={24} color='grey' />
                <ShareFat size={24} color='grey' />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    addItemToCart();
                  }}
                  style={[styles.button, styles.blackButton]}
                >
                  {/* Inner shadow overlay */}
                  <View style={styles.innerShadow} />
                  <View>
                    <Text style={styles.whiteText}>Add to Cart</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className='flex-row justify-center items-center'>
              <View className=' flex-col flex-1 gap-2 '>
                <Text style={{ fontWeight: "500", fontSize: 14 }}>
                  {item.title}
                </Text>
                <Text
                  style={{ fontWeight: "400", fontSize: 14, color: "grey" }}
                >
                  Bags | {item.brand}
                </Text>
              </View>
              <View
                className=' px-2 py-1 bg-blue-200'
                style={{
                  backgroundColor: "#DFEDF4",
                  borderRadius: 4,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  marginLeft: 10,
                }}
              >
                <Text style={{ fontWeight: 700, color: "#314B57" }}>
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
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  whiteButton: {
    backgroundColor: "#FFFFFF",
  },
  redButton: {
    backgroundColor: "#FF0000",
  },
  blackButton: {
    backgroundColor: "#1C2526",
  },
  iconButton: {
    padding: 10, // Smaller padding for icon button
    width: 50, // Fixed width for square button
    height: 50, // Fixed height for square button
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
  whiteText: {
    color: "#FFFFFF",
  },
  blackText: {
    color: "#000000",
  },
});
