import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";
import ProductFeed from "@/components/ProductFeed";
import { BellRinging, ShoppingCart } from "phosphor-react-native";
// import { handleInitiatePayment } from "@/utils/InitiatePayment";

const Page = () => {
  //Undo this action
  // const stories = useQuery(api.stories.list);
  // const approvedProducts = useQuery(api.products.getApprovedProducts);

  const router = useRouter();
  const amount = "1000";
  // console.log("Stories:", stories);

  // Undo this action
  // if (!stories) {
  //   return (
  //     <SafeAreaView className='flex-1'>
  //       <Text>Loading stories...</Text>
  //     </SafeAreaView>
  //   );
  // }

  // if (stories.length === 0) {
  //   return (
  //     <SafeAreaView className='flex-1'>
  //       <Text>No stories available</Text>
  //     </SafeAreaView>
  //   );
  // }

  const renderStoriesSection = () => (
    <View>
      {/* <Button
        title='Initiate Payment (NPR 100)'
        onPress={() => handleInitiatePayment({ amount })}
      /> */}

      <View className='px-6'>
        <Text className='text-xl font-bold mb-4'>Home</Text>
      </View>
      {/* Undo this action */}
      {/* <ScrollView
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
      </ScrollView> */}
    </View>
  );

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-row justify-between'>
        <View className='flex-row items-center gap-6 px-4 py-2'>
          <Image
            source={{
              uri: require("@/assets/images/placeholder.jpg"),
            }}
            width={64}
            height={64}
            style={{ borderRadius: 99, backgroundColor: "#ccc" }}
          />
          <Text className='text-2xl font-bold'>Home</Text>
        </View>
        <Pressable
          onPress={() => {
            router.replace("/cart");
          }}
        >
          <BellRinging size={32} color='#000' />
        </Pressable>
        <Pressable
          onPress={() => {
            router.replace("/cart");
          }}
        >
          <ShoppingCart size={32} color='#000' />
        </Pressable>
      </View>

      {/* //This button should only be called through checkout from the cart page */}
      {/* <Button
        title={`Initiate Payment ${amount}`}
        onPress={() => handleInitiatePayment({ amount })}
      /> */}
      {/* Undo this action */}

      {/* <FlatList
        data={approvedProducts}
        renderItem={({ item }) =>
          item && typeof item.brand === "string" ? (
            <ProductFeed item={{ ...item, brand: item.brand || "" }} />
          ) : null
        }
        ListHeaderComponent={renderStoriesSection} // Stories section as header
        ListEmptyComponent={() => <Text>No products</Text>}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Page;
