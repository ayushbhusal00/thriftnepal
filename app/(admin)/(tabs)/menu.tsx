import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Role,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

import { CaretRight } from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";
import UserProfile from "@/app/components/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserProfile } from "@/hooks/useUserProfile";

const Profile = () => {
  const { colors } = useContext(ThemeContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();
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
          SELLER
        </Text>

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
        <TouchableOpacity onPress={() => console.log("Profile Data")}>
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign
                size={24}
                color={colors.text.secondary}
                name='wallet'
              />
              <Text
                className={`text-subhead-1`}
                style={{
                  color: colors.text.secondary,
                }}
              >
                Earnings
              </Text>
            </View>
            <CaretRight size={24} color={colors.text.secondary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`../(admin)/(modal)/AddProduct`)}
        >
          <View className='px-6 py-4 flex-row justify-between items-center'>
            <View className='flex-row gap-4 items-center '>
              <AntDesign size={24} color={colors.text.secondary} name='skin' />
              <Text
                className={`text-subhead-1 `}
                style={{
                  color: colors.text.secondary,
                }}
              >
                Create a new product
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
          onPress={() => signOut()}
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
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          flexDirection: "row",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Text>Terms of Service</Text>
        <Text>•</Text>
        <Text>Privacy Policy</Text>
      </View>
      <View
        style={{
          marginTop: 6,
          flexDirection: "row",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.text.secondary }}>Version Alpha@0.1</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem("userRole", "user");
          console.log("User Switched to Buyer");
          router.replace("/(auth)/(tabs)");
        }}
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
        <View className='flex-row gap-2 items-center'>
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
            Switch to Buyer
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
