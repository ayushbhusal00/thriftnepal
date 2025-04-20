import { router, Tabs } from "expo-router";
import { View } from "react-native";
import {
  HouseLine,
  MagnifyingGlass,
  Heart,
  User,
  PlusSquare,
} from "phosphor-react-native";
import * as Haptics from "expo-haptics";

const Layout = () => {
  const CreateIcon = () => {
    // Ensure `key` is not passed to AddSquareIcon

    return (
      <View
        className={`rounded-full p-2 absolute w-20 h-20 items-center justify-center bg-[#AD5691]`}
      >
        <PlusSquare size={32} color={"white"} weight='duotone' />
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AD5691",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "white" },
        tabBarItemStyle: {
          borderTopWidth: 2,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon({ color, size }) {
            return <HouseLine size={size} color={color} weight='duotone' />;
          },
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: "Search",
          tabBarIcon({ color, size }) {
            return (
              <MagnifyingGlass size={size} color={color} weight='duotone' />
            );
          },
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: "Create",
          tabBarIcon({ color, size }) {
            return CreateIcon();
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.selectionAsync();
            router.push("/(auth)/(modal)/create");
          },
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          title: "Favourites",
          tabBarIcon({ color, size }) {
            return <Heart size={size} color={color} weight='duotone' />;
          },
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon({ color, size }) {
            return <User size={size} color={color} weight='duotone' />;
          },
        }}
      />
    </Tabs>
  );
};
export default Layout;
