import { router, Tabs } from "expo-router";

import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useCart } from "@/utils/Store";
import AntDesign from "react-native-vector-icons/AntDesign";

const Layout = () => {
  const { colors, theme } = useContext(ThemeContext);
  const cartCount = useCart((state) => state.cartCount);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.brand.default,
          tabBarInactiveTintColor: colors.background.subtle,
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: colors.background.secondary },
          tabBarItemStyle: {
            borderTopWidth: 0,
            borderTopColor: colors.background.border,
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            headerShown: false,
            title: "Listing",
            tabBarIcon({ color, size }) {
              return <AntDesign name='solution1' size={size} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            headerShown: false,
            title: "Create Items",
            tabBarIcon({ color, size }) {
              return <AntDesign name='laptop' size={size} color={color} />;
            },
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: "User Profile",
            headerStyle: { backgroundColor: colors.background.secondary },
            headerTintColor: colors.text.primary,
            tabBarIcon({ color, size }) {
              return <AntDesign size={size} color={color} name='user' />;
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
