import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};
const Profile = ({ userId, showBackButton = true }: ProfileProps) => {
  const { colors } = useContext(ThemeContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const { userProfile } = useUserProfile();
  const userProfile = {
    _creationTime: 1745075425708.771,
    _id: "jd777hjdbxa16v8yhn33xsr52s7ebzm8",
    clerkId: "user_2vx8aDFqJO7hHUmklYe4DenhCHg",
    email: "ayushbhusal00@gmail.com",
    first_name: "Ayush",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydng4YUMxdDYxbmxBRGJuRlU5S0N0NWZQekkifQ",
    last_name: "Bhusal",
    username: "Ayush Bhusal",
  };
  const { top } = useSafeAreaInsets();
  const { signOut } = useAuth();

  return (
    <View
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
        <TouchableOpacity onPress={() => router.push(`/Favourites`)}>
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
      <TouchableOpacity
        onPress={toggleTheme}
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
    </View>
  );
};

export default Profile;
