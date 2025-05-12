import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Role,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useRouter } from "expo-router";

import { CaretRight } from "phosphor-react-native";
import { ThemeContext } from "@/providers/ThemeProvider";
import UserProfile from "@/app/components/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRole } from "@/providers/RoleProvider";

const Profile = () => {
  const { colors, theme, toggleTheme } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();
  const router = useRouter();
  const { signOut } = useAuth();
  const { switchRole } = useRole();
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);
  const [showSwitchAnimation, setShowSwitchAnimation] = useState(false);

  const handleRoleSwitch = async () => {
    try {
      setShowSwitchAnimation(true);
      setTimeout(async () => {
        setShowSwitchAnimation(false);
        setIsSwitchingRole(true);
        await switchRole("user");
        setIsSwitchingRole(false);
      }, 4800);
    } catch (error) {
      setShowSwitchAnimation(false);
      setIsSwitchingRole(false);
      console.error("Error switching role:", error);
      Alert.alert("Error", "Failed to switch role. Please try again.");
    }
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
      <ScrollView style={{ position: "relative" }}>
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
                <AntDesign
                  size={24}
                  color={colors.text.secondary}
                  name='skin'
                />
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
                <AntDesign
                  size={24}
                  color={colors.text.secondary}
                  name='earth'
                />
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
              backgroundColor: colors.brand.default,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
          >
            <View className='flex-row gap-2 items-center '>
              <Text
                className='text-lg'
                style={{
                  color:
                    theme === "light"
                      ? colors.text.onColor
                      : colors.text.primary,
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
          <Text style={{ color: colors.text.primary }}>Terms of Service</Text>
          <Text style={{ color: colors.text.primary }}>•</Text>
          <Text style={{ color: colors.text.primary }}>Privacy Policy</Text>
        </View>
        <View
          style={{
            marginTop: 6,
            flexDirection: "row",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.text.secondary }}>
            Version Alpha@0.1
          </Text>
        </View>
      </ScrollView>
      {showSwitchAnimation && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(30, 30, 30, 0.7)", // faded background
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <Image
            source={require("@/assets/images/animated.gif")}
            style={{ width: 120, height: 120 }}
            resizeMode='contain'
          />
        </View>
      )}
      <TouchableOpacity
        onPress={handleRoleSwitch}
        disabled={isSwitchingRole}
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
          backgroundColor:
            theme === "light"
              ? colors.background.contrast
              : colors.accent.default,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          opacity: isSwitchingRole ? 0.7 : 1,
        }}
      >
        <View className='flex-row gap-2 items-center'>
          {isSwitchingRole ? (
            <ActivityIndicator color={colors.text.onColor} />
          ) : (
            <AntDesign
              size={24}
              color={
                theme === "light" ? colors.text.onColor : colors.text.primary
              }
              name='retweet'
            />
          )}
          <Text
            className='text-lg'
            style={{
              color:
                theme === "light" ? colors.text.onColor : colors.text.primary,
            }}
          >
            {isSwitchingRole ? "Switching..." : "Switch to Buyer"}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
