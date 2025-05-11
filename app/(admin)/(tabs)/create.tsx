import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ProductStatus from "@/app/components/ProductStatus";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/providers/ThemeProvider";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Page = () => {
  const { theme, colors } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();

  const screenHeight = Dimensions.get("window").height;

  const myProducts = useQuery(api.products.getMyProducts, {
    userId: userProfile?._id as Id<"users">,
  });

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
          className={`text-2xl font-dmsans`}
          style={{ color: colors.text.primary }}
        >
          Your Listings
        </Text>
        <View className='flex-row gap-4'>
          <AntDesign
            name='menuunfold'
            size={24}
            color={colors.text.secondary}
          />
          <AntDesign
            name='appstore-o'
            size={24}
            color={colors.text.secondary}
          />
          <Pressable
            onPress={() => {
              router.push("/create");
            }}
          >
            <AntDesign name='plus' size={24} color={colors.text.secondary} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={myProducts}
        renderItem={({ item }) => {
          return item && typeof item.brand === "string" ? (
            <View className={`rounded-lg`}>
              <ProductStatus item={item as any} />
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
                  router.push("/create");
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
