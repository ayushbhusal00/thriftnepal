import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import UserProfile from "./UserProfile";

type ProfileProps = {
  userId?: Id<"users">;
  showBackButton?: boolean;
};
const Profile = ({ userId, showBackButton = true }: ProfileProps) => {
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
    <View style={{ paddingTop: top }} className='flex'>
      <View
        style={{
          paddingBottom: 24,
          borderBottomColor: "#ccc",
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
              className='flex-row gap-2 items-center p-2 bg-green-500'
            >
              <Ionicons name='chevron-back-outline' size={16} color='black' />
              <Text>Back</Text>
            </TouchableOpacity>
          )}
          {/* Header Right */}

          <TouchableOpacity onPress={() => signOut()}>
            <Ionicons name='log-out-outline' size={24} color='black' />
          </TouchableOpacity>
        </View>
        {userProfile && <UserProfile props={userProfile as any} />}
      </View>
    </View>
  );
};

export default Profile;
