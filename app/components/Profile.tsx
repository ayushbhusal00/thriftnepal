import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import UserProfile from "./UserProfile";

import {
  BookOpenText,
  CaretLeft,
  CaretRight,
  Lamp,
  Package,
  SignOut,
  UserCircle,
} from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";

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
        paddingTop: top,
        backgroundColor: colors.background.secondary,
        flex: 1,
      }}
    >
      <View
        style={{
          borderBottomColor: colors.background.border,
          borderBottomWidth: 0.25,
        }}
      >
        {/* //Header Nav */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: showBackButton ? "space-between" : "flex-end",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          {/* Header Left */}
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              className='flex-row gap-4 items-center p-2'
            >
              <CaretLeft size={16} color={colors.text.secondary} />
              <Text
                className={`bg-${colors.text.primary}`}
                style={{ color: colors.text.primary }}
              >
                Back
              </Text>
            </TouchableOpacity>
          )}
          {/* Header Right */}

          <TouchableOpacity onPress={() => signOut()}>
            <SignOut size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
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
              <UserCircle size={24} color={colors.text.secondary} />
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
        <TouchableOpacity onPress={() => router.push(`/(auth)/Orders`)}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <Package size={24} color={colors.text.secondary} />
              <Text
                className={`text-subhead-1 `}
                style={{
                  color: colors.text.secondary,
                }}
              >
                Your Orders
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
              <BookOpenText size={24} color={colors.text.secondary} />
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
              <Lamp
                size={24}
                color={
                  theme === "light"
                    ? colors.text.secondary
                    : colors.accent.default
                }
                weight={theme === "light" ? "regular" : "fill"}
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
    </View>
  );
};

export default Profile;
