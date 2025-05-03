import { router, Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  HouseLine,
  Storefront,
  Heart,
  User,
  PlusSquare,
  Camera,
  Image,
} from "phosphor-react-native";

import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

const Layout = () => {
  const { colors } = useContext(ThemeContext);

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
            title: "Home",
            tabBarIcon({ color, size }) {
              return <HouseLine size={size} color={color} weight='duotone' />;
            },
          }}
        />
        <Tabs.Screen
          name='marketplace'
          options={{
            headerShown: false,
            title: "Marketplace",
            tabBarIcon({ color, size }) {
              return <Storefront size={size} color={color} weight='duotone' />;
            },
          }}
        />

        <Tabs.Screen
          name='favourites'
          options={{
            title: "Favourites",
            headerShown: false,
            tabBarIcon({ color, size }) {
              return <Heart size={size} color={color} weight='duotone' />;
            },
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: "Add new Product",
            tabBarIcon({ color, size }) {
              return <PlusSquare size={size} color={color} weight='duotone' />;
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
