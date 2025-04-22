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
  const { userProfile } = useUserProfile();
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
        {userProfile && <UserProfile props={userProfile} />}
      </View>
    </View>
  );
};

export default Profile;
