import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductStatus from "@/app/components/ProductStatus";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/providers/ThemeProvider";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

type ViewMode = "list" | "grid";

const Page = () => {
  const { theme, colors } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const myProducts = useQuery(api.products.getMyProducts, {
    userId: userProfile?._id as Id<"users">,
  });

  const renderItem = ({ item }: { item: any }) => {
    if (!item || typeof item.brand !== "string") return null;

    if (viewMode === "list") {
      return (
        <View className='rounded-lg'>
          <ProductStatus item={item} />
        </View>
      );
    }

    // Grid view
    return (
      <View
        style={{
          width: (screenWidth - 48) / 2,
          margin: 8,
          borderRadius: 12,
          borderColor: colors.background.border,
          borderWidth: 0.5,
          backgroundColor: colors.background.primary,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/(admin)/(modal)/AddProduct",
              params: { id: item._id },
            });
          }}
        >
          <Image
            source={{ uri: item.imageUrls[0] }}
            style={{
              width: "100%",
              height: 150,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            resizeMode='cover'
          />
          <View style={{ padding: 12 }}>
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 4,
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
              numberOfLines={1}
            >
              {item.brand}
            </Text>
            <Text
              style={{
                color: colors.brand.default,
                fontSize: 16,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              Rs. {item.price}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          theme === "light"
            ? colors.background.secondary
            : colors.background.primary,
        flex: 1,
        gap: 8,
      }}
    >
      <View className='px-5 flex-row items-center justify-between mb-4'>
        <Text
          className='text-2xl font-dmsans'
          style={{ color: colors.text.primary }}
        >
          Your Listings
        </Text>
        <View className='flex-row gap-4'>
          <Pressable onPress={() => setViewMode("list")}>
            <AntDesign
              name='bars'
              size={24}
              color={
                viewMode === "list"
                  ? colors.brand.default
                  : colors.text.secondary
              }
            />
          </Pressable>
          <Pressable onPress={() => setViewMode("grid")}>
            <AntDesign
              name='appstore-o'
              size={24}
              color={
                viewMode === "grid"
                  ? colors.brand.default
                  : colors.text.secondary
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(admin)/(modal)/AddProduct");
            }}
          >
            <AntDesign name='plus' size={24} color={colors.text.secondary} />
          </Pressable>
        </View>
      </View>
      <FlatList
        key={viewMode}
        data={myProducts}
        renderItem={renderItem}
        numColumns={viewMode === "grid" ? 2 : 1}
        contentContainerStyle={
          viewMode === "grid" ? { padding: 8 } : { gap: 8 }
        }
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 20,
                height: screenHeight * 0.7,
              }}
            >
              <Image
                source={require("@/assets/images/ghost.png")}
                style={{ width: 120, height: 120 }}
              />
              <Text
                className='text-h4 font-dmsans'
                style={{ color: colors.text.secondary, marginTop: 10 }}
              >
                Nothing Listed Yet
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/");
                }}
                style={{
                  flexDirection: "row",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 16,
                  backgroundColor: colors.brand.default,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  marginTop: 16,
                }}
              >
                <Text
                  style={{
                    color: colors.text.onColor,
                  }}
                  className='text-paragraph-1 font-dmsans'
                >
                  Start Selling
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Page;
