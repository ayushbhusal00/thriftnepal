import { router, Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  HouseLine,
  Storefront,
  Heart,
  User,
  PlusSquare,
  Camera,
  Image,
  UserCircle,
  Basket,
} from "phosphor-react-native";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useCart } from "@/utils/Store";
import { HomeOutlined } from "@ant-design/icons";
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
            title: "Home",
            tabBarIcon({ color, size }) {
              return <AntDesign name='home' size={size} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name='favourites'
          options={{
            headerShown: false,
            title: "Favourites",
            tabBarIcon({ color, size }) {
              return <AntDesign name='hearto' size={size} color={color} />;
            },
          }}
        />

        <Tabs.Screen
          name='cart'
          options={{
            title: "Cart",
            headerStyle: { backgroundColor: colors.background.secondary },
            headerTintColor: colors.text.primary,

            tabBarIcon({ color, size }) {
              return (
                <View style={{ position: "relative" }}>
                  {cartCount && (
                    <Text
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        fontSize: 10,
                        color: colors.text.onColor,
                        backgroundColor: colors.brand.default,
                        paddingHorizontal: 4,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: colors.brand.border,
                        zIndex: 1,
                      }}
                    >
                      {cartCount}
                    </Text>
                  )}
                  <AntDesign size={size} color={color} name='shoppingcart' />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            headerShown: false,
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
