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
import * as Haptics from "expo-haptics";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Layout = () => {
  const [fabsVisible, setFabsVisible] = useState(false);
  const scale = useSharedValue(0); // For animation

  const CreateIcon = () => {
    return (
      <View
        className={`rounded-full p-2 absolute w-20 h-20 items-center justify-center bg-[#AD5691]`}
      >
        <PlusSquare size={32} color={"white"} weight='duotone' />
      </View>
    );
  };

  const handleCreatePress = () => {
    Haptics.selectionAsync();
    setFabsVisible(!fabsVisible);
    scale.value = fabsVisible ? 0 : 1; // Toggle animation
  };

  const handleFABOption = (source: "camera" | "gallery") => {
    setFabsVisible(false);
    scale.value = 0; // Hide FABs
    router.push({
      pathname: "/create",
      params: { source },
    });
  };

  // Animated styles for FABs
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 200 }) }],
    opacity: withTiming(scale.value, { duration: 200 }),
  }));

  return (
    <>
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
              handleCreatePress();
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

      {/* Floating Action Buttons */}
      {fabsVisible && (
        <View style={styles.fabContainer}>
          <Animated.View style={[styles.fab, animatedStyle]}>
            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => handleFABOption("camera")}
            >
              <Camera size={24} color='white' weight='duotone' />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.fab, animatedStyle, styles.fabGallery]}>
            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => handleFABOption("gallery")}
            >
              <Image size={24} color='white' weight='duotone' />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 100, // Adjust based on tab bar height
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },
  fab: {
    // position: "absolute",
  },
  fabGallery: {
    // bottom: 60, // Offset for second FAB
  },
  fabButton: {
    backgroundColor: "#AD5691",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default Layout;
