import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";
import ProductFeed from "@/components/ProductFeed";

const Page = () => {
  const stories = useQuery(api.stories.list);
  const products = useQuery(api.products.getProducts);
  const router = useRouter();

  console.log("Stories:", stories);

  if (!stories) {
    return (
      <SafeAreaView className='flex-1'>
        <Text>Loading stories...</Text>
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

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView>
        <View>
          <View className='px-6'>
            <Text className='text-xl font-bold mb-4'>Home</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 12,
              borderBottomColor: "#00000010",
              borderBottomWidth: 1,
            }}
          >
            <View className='flex-row gap-4 w-full pl-5'>
              {stories.map((item, index) => (
                <TouchableOpacity
                  key={item.userId}
                  onPress={() => {
                    router.push({
                      pathname: "/StoriesViewer",

                      params: {
                        userId: item.userId,
                        storyImageUrls: JSON.stringify(item.storyImageUrls),
                        userImageUrl: item.userImageUrl || "",
                      },
                    });
                  }}
                  className='relative flex-row items-center gap-4 mb-4'
                >
                  <View className='relative'>
                    {item.storyImageUrls?.[0] ? (
                      <Image
                        source={{ uri: item.storyImageUrls[0] }}
                        className='rounded-lg shadow-md border border-1 border-neutral-200'
                        style={{
                          width: 100,
                          height: 140,
                        }}
                      />
                    ) : (
                      <Text>No Story Image</Text>
                    )}
                    <Text
                      numberOfLines={1}
                      className='absolute bottom-2 left-2 text-white text-sm font-semibold'
                      style={{ zIndex: 2 }}
                    >
                      {item.userId}
                    </Text>
                    {item.userImageUrl ? (
                      <Image
                        source={{ uri: item.userImageUrl }}
                        className='rounded-lg shadow-md border border-1 border-purple-200'
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 99,
                          position: "absolute",
                          top: 10,
                          left: 10,
                        }}
                      />
                    ) : (
                      <Text className='absolute top-10 left-10 text-xs'>
                        No User Image
                      </Text>
                    )}
                    <LinearGradient
                      colors={["#00000000", "#00000070"]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        position: "absolute",
                        borderRadius: 10,
                        zIndex: 1,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }: { item: any }) => {
            return item && typeof item.brand === "string" ? (
              <ProductFeed item={{ ...item, brand: item.brand || "" }} />
            ) : null;
          }}
          ListEmptyComponent={() => {
            return <Text>No products</Text>;
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#ccc",
              }}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
