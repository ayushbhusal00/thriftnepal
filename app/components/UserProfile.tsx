import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ThemeContext } from "@/providers/ThemeProvider";

interface UserProfileProps {
  props: {
    _id: Id<"users">;
    _creationTime: number;
    imageUrl?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    email: string;
    clerkId: string;
    username: string | null;
  };
}
const UserProfile = (props: UserProfileProps) => {
  const { colors } = useContext(ThemeContext);
  const { userProfile } = useUserProfile();
  // console.log("user props 1:", props);
  return (
    <View style={{ backgroundColor: colors.background.secondary }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: userProfile?.imageUrl,
          }}
          width={40}
          height={40}
          style={{ borderRadius: 50 }}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          >
            {userProfile?.first_name + " " + userProfile?.last_name}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 4,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: colors.text.secondary,
              }}
            >
              {userProfile?.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
