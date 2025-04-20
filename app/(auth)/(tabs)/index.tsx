import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "phosphor-react-native";

const Page = () => {
  const category = [
    {
      key: "1",
      value: "Bag",
      image: require("@/assets/images/category/bag.png"),
      user: require("@/assets/images/users/user1.jpg"),
      userName: "John Doe",
    },
    {
      key: "2",
      value: "Dress",
      image: require("@/assets/images/category/dress.png"),
      user: require("@/assets/images/users/user2.jpg"),
      userName: "Melissa Smith",
    },
    {
      key: "3",
      value: "Jacket",
      image: require("@/assets/images/category/jacket.png"),
      user: require("@/assets/images/users/user3.jpg"),
      userName: "Thomas Johnson",
    },
    {
      key: "4",
      value: "Salwar",
      image: require("@/assets/images/category/salwar.png"),
      user: require("@/assets/images/users/user4.jpg"),
      userName: "Colton Williams",
    },
    {
      key: "5",
      value: "Shirt",
      image: require("@/assets/images/category/shirt.png"),
      user: require("@/assets/images/users/user5.jpg"),
      userName: "Smith Johnson",
    },
    {
      key: "6",
      value: "Shoe",
      image: require("@/assets/images/category/shoe.png"),
      user: require("@/assets/images/users/user6.jpg"),
      userName: "Doe Smith",
    },
  ];

  return (
    <SafeAreaView className='flex-1'>
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
          <View className='flex-row gap-4 w-full pl-4'>
            {category.map((item) => (
              <View
                key={item.key}
                className='relative flex-row items-center gap-4 mb-4'
              >
                <View className='relative'>
                  <Image
                    source={item.image}
                    className='rounded-lg shadow-md border border-1 border-neutral-200'
                    style={{
                      width: 100,
                      height: 140,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    className='absolute bottom-2 left-2 text-white text-sm font-semibold'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {item.userName}
                  </Text>

                  <Image
                    source={item.user}
                    className='rounded-lg shadow-md border border-1 border-purple-200'
                    style={{
                      width: 32,
                      height: 32,

                      zIndex: 2,
                      padding: 2,
                      backgroundColor: "#B300C280",
                      borderRadius: 99,
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  />

                  <LinearGradient
                    // Define the gradient colors
                    colors={["#00000000", "#00000070"]}
                    // Optional: Define start and end points for the gradient
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      position: "absolute",
                      // backgroundColor: "#00000050",
                      top: 0,
                      left: 0,
                      borderRadius: 10,
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Page;
