import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
const Layout = () => {
  const { signOut } = useAuth();
  const CreateIcon = ({
    color,
    size,
    focused,
  }: {
    color: string;
    size: number;
    focused: boolean;
  }) => {
    return (
      <View
        className={` rounded-full p-2 absolute w-20 h-20 items-center justify-center ${focused ? "bg-blue-500" : "bg-neutral-100"}`}
      >
        <Ionicons
          name={focused ? "add" : "add-outline"}
          size={size}
          color={focused ? "white" : color}
        />
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: "Search",
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: "Create",
          tabBarIcon({ color, size, focused }) {
            return CreateIcon({ color, size, focused });
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
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon({ color, size, focused }) {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          },
          headerRight: () => (
            <Ionicons
              name='log-out-outline'
              size={24}
              color='black'
              onPress={() => signOut()}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
