import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

import {
  BookOpenText,
  CaretLeft,
  CaretRight,
  HeartHalf,
  Lamp,
  Package,
  SignOut,
  UserCircle,
} from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";
import UserProfile from "@/app/components/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};
const Profile = ({ userId, showBackButton = true }: ProfileProps) => {
  const animation = useRef<LottieView>(null);
  const { colors } = useContext(ThemeContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();
  const [showSwitchAnimation, setShowSwitchAnimation] = useState(false);

  const handleSwitchToSeller = async () => {
    setShowSwitchAnimation(true);
    setTimeout(async () => {
      setShowSwitchAnimation(false);
      await AsyncStorage.setItem("userRole", "seller");
      console.log("User Switched to Seller");
      router.replace("/(admin)/(tabs)");
    }, 4800);
  };

  const handleSignOut = async () => {
    await signOut();
    router.dismissTo("/(public)");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background.secondary,
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          borderBottomColor: colors.background.border,
          borderBottomWidth: 0.25,
        }}
      >
        {/* //Header Nav */}

        {userProfile && <UserProfile props={userProfile as any} />}
      </View>
      <View
        className='flex-col'
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Text
          style={{
            paddingVertical: 16,
            marginHorizontal: 20,
            color: colors.text.secondary,
          }}
        >
          ACCOUNT
        </Text>
        <TouchableOpacity onPress={() => console.log("Profile Data")}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign
                size={24}
                color={colors.text.secondary}
                name='smileo'
              />
              <Text
                className={`text-subhead-1`}
                style={{
                  color: colors.text.secondary,
                }}
              >
                Profile Data
              </Text>
            </View>
            <CaretRight size={24} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`./Orders`)}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign
                size={24}
                color={colors.text.secondary}
                name='rocket1'
              />
              <Text
                className={`text-subhead-1 `}
                style={{
                  color: colors.text.secondary,
                }}
              >
                My Orders
              </Text>
            </View>
            <CaretRight size={24} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/favourites`)}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign
                size={24}
                color={colors.text.secondary}
                name='hearto'
              />
              <Text
                className={`text-subhead-1`}
                style={{
                  color: colors.text.secondary,
                }}
              >
                My Favourites
              </Text>
            </View>
            <CaretRight size={24} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ backgroundColor: colors.background.secondary }}
        className='flex-col'
      >
        <Text
          style={{
            paddingVertical: 16,
            marginHorizontal: 20,
            color: colors.text.secondary,
          }}
        >
          PREFERENCE
        </Text>
        <TouchableOpacity onPress={() => console.log("Change Language")}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign size={24} color={colors.text.secondary} name='earth' />
              <Text
                className={`text-subhead-1`}
                style={{
                  color: colors.text.secondary,
                }}
              >
                Language
              </Text>
            </View>
            <CaretRight size={24} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme}>
          <View className='p-6 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign
                size={24}
                color={
                  theme === "light"
                    ? colors.text.secondary
                    : colors.accent.default
                }
                name='bulb1'
              />
              <Text
                className='text-lg'
                style={{
                  color: colors.text.secondary,
                }}
              >
                App Theme
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopColor: colors.background.border,
          borderTopWidth: 0.5,
        }}
      >
        <TouchableOpacity
          onPress={() => handleSignOut()}
          style={{
            paddingVertical: 12,
            marginHorizontal: 20,
            marginVertical: 12,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: colors.background.contrast,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
        >
          <View className='flex-row gap-2 items-center '>
            <Text
              className='text-lg'
              style={{
                color: colors.text.onColor,
              }}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {userProfile?.role === "seller" && (
        <TouchableOpacity
          onPress={handleSwitchToSeller}
          style={{
            width: 200,
            position: "absolute",
            bottom: 20,
            left: Dimensions.get("window").width / 2 - 100,
            paddingVertical: 12,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: colors.background.contrast,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
          }}
        >
          <View className='flex-row gap-2 items-center '>
            <AntDesign
              size={24}
              color={
                theme === "light" ? colors.text.onColor : colors.accent.default
              }
              name='retweet'
            />
            <Text
              className='text-lg'
              style={{
                color: colors.text.onColor,
              }}
            >
              Switch to Seller
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {showSwitchAnimation && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 1)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#eee",
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("@/assets/images/profile-switch.json")}
          />
          {/* <Image
            source={require("@/assets/images/animated.gif")}
            style={{ width: 120, height: 120 }}
            resizeMode='contain'
          /> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
