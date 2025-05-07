import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";
import ProductFeed from "@/app/components/ProductFeed";
import SkeletalLoader from "@/app/components/SkeletalLoader";

import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext, useState, useCallback } from "react";
import { useCart } from "@/utils/Store";
import { Info } from "phosphor-react-native";

const PAGE_SIZE = 5;

const Page = () => {
  const { colors, theme } = useContext(ThemeContext);
  const router = useRouter();
  const cartCount = useCart((state) => state.cartCount);
  const [cursor, setCursor] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const stories = useQuery(api.stories.list);
  const paginatedProducts = useQuery(
    api.products.getApprovedAndNotSoldProducts,
    {
      cursor,
      pageSize: PAGE_SIZE,
    }
  );

  const loadMoreProducts = useCallback(() => {
    if (!paginatedProducts || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    if (paginatedProducts.products) {
      setAllProducts((prev) => [...prev, ...paginatedProducts.products]);
      setCursor(paginatedProducts.nextCursor);
      setHasMore(!paginatedProducts.isDone);
    }
    setIsLoadingMore(false);
  }, [paginatedProducts, isLoadingMore, hasMore]);

  if (!stories) {
    return (
      <SafeAreaView
        className='flex-1'
        style={{ backgroundColor: colors.background.primary }}
      >
        <ActivityIndicator
          size='large'
          color={colors.brand.default}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
        {/* <Text
          style={{
            flex: 1,
            color: colors.text.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading stories...
        </Text> */}
      </SafeAreaView>
    );
  }

  if (stories.length === 0) {
    return (
      <SafeAreaView className='flex-1'>
        <Text>No stories available</Text>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View
      className='flex-row gap-2 sticky top-0 justify-between items-center pl-2 pr-4 py-4'
      style={{ backgroundColor: colors.background.primary }}
    >
      <View className='flex-row items-center'>
        <TextInput
          placeholder='Search for products'
          placeholderTextColor={colors.text.secondary}
          className={`flex-row items-center flex-1 gap-4 p-4 border-hairline border-[${colors.background.border}] shadow-['red'] rounded-lg`}
          style={{
            borderColor: colors.background.border,
            borderWidth: 0.5,
            color: colors.text.primary,
            backgroundColor:
              theme === "dark"
                ? colors.background.secondary
                : colors.background.primary,
            marginHorizontal: 12,
            boxShadow: `0 1 2px 0 ${colors.background.border} inset`,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowColor: colors.background.contrast,
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
          }}
          onFocus={(props) => {
            props.target.setNativeProps({
              style: {
                borderColor: colors.accent.default,
                boxShadow: `0 0 0 2px ${colors.accent.default} inset`,
              },
            });
          }}
          onBlur={(props) => {
            props.target.setNativeProps({
              style: {
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowColor: colors.background.contrast,
                shadowOpacity: 0.2,
                shadowRadius: 1,
              },
            });
          }}
        />
        <View className='flex-row items-center gap-3'>
          <Pressable
            onPress={() => {
              router.replace("./Profile");
            }}
          >
            <Image
              source={require("@/assets/images/placeholder.jpg")}
              style={{
                width: 46,
                height: 46,
                borderRadius: 99,
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              router.replace("./Cart");
            }}
          >
            <Image
              source={require("@/assets/images/cart.jpg")}
              style={{
                width: 46,
                height: 46,
                borderRadius: 99,
              }}
            />
            <Text
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor:
                  cartCount === 0
                    ? colors.background.contrast
                    : colors.brand.default,
                color: "white",
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 99,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
  // const renderStoriesSection = () => (
  //   <View style={{ backgroundColor: colors.background.primary }}>
  //     <ScrollView
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={{
  //         flex: 1,
  //         borderBottomColor: colors.background.border,
  //         borderBottomWidth: 1,
  //       }}
  //     >
  //       <View className='flex-row gap-3 w-full pl-5'>
  //         {stories.map((item, index) => (
  //           <TouchableOpacity
  //             key={item.userId}
  //             onPress={() => {
  //               router.push({
  //                 pathname: "/StoriesViewer",
  //                 params: {
  //                   userId: item.userId,
  //                   storyImageUrls: JSON.stringify(item.storyImageUrls),
  //                   userImageUrl: item.userImageUrl || "",
  //                 },
  //               });
  //             }}
  //             className='relative flex-row items-center gap-4 mb-4'
  //           >
  //             <View className='relative'>
  //               {item.userImageUrl ? (
  //                 <LinearGradient
  //                   colors={[colors.brand.default, colors.accent.default]} // slate-300 to slate-700
  //                   start={{ x: 0, y: 0 }}
  //                   end={{ x: 0, y: 1 }}
  //                   style={{
  //                     width: 68,
  //                     height: 68,
  //                     borderRadius: 34,
  //                     alignItems: "center",
  //                     justifyContent: "center",
  //                   }}
  //                 >
  //                   <Image
  //                     source={{ uri: item.userImageUrl }}
  //                     style={{
  //                       width: 64,
  //                       height: 64,
  //                       borderRadius: 32,
  //                       borderWidth: 2,
  //                       borderColor:
  //                         theme === "dark"
  //                           ? colors.background.secondary
  //                           : colors.background.primary,
  //                     }}
  //                   />
  //                 </LinearGradient>
  //               ) : (
  //                 <Text className='absolute top-10 left-10 text-xs'>
  //                   No User Image
  //                 </Text>
  //               )}
  //             </View>
  //           </TouchableOpacity>
  //         ))}
  //       </View>
  //     </ScrollView>
  //   </View>
  // );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      {renderHeader()}
      <FlatList
        style={{ padding: 10, flex: 1 }}
        data={allProducts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          item && typeof item.brand === "string" ? (
            <View
              style={{
                width: "50%", // Each item takes half the width for 2 columns
                padding: 10, // Add padding for spacing between items
              }}
            >
              <ProductFeed item={item as any} />
            </View>
          ) : null
        }
        numColumns={2}
        ListEmptyComponent={() =>
          isLoadingMore || !paginatedProducts ? (
            // <SkeletalLoader />
            <SafeAreaView>
              <ActivityIndicator
                size='large'
                color={colors.brand.default}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />

              <Text style={{ color: colors.text.primary }}>
                Loading products
              </Text>
            </SafeAreaView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Info color={colors.text.secondary} size={24} weight='bold' />

              <Text>No products</Text>
            </View>
          )
        }
        onRefresh={loadMoreProducts}
        refreshing={isLoadingMore}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={() =>
        //   isLoadingMore && hasMore ? <SkeletalLoader /> : null
        // }
      />
    </SafeAreaView>
  );
};

export default Page;
