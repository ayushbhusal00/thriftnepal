import {
  View,
  Text,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Id } from "@/convex/_generated/dataModel";
import { Envelope, IdentificationCard } from "phosphor-react-native";

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
  console.log("user props 1:", props);
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          padding: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {props.props.first_name + " " + props.props.last_name}
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
            <IdentificationCard size={20} weight='thin' />
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              @{props.props.username}
            </Text>
          </View>
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
            <Envelope size={20} weight='thin' />
            <Text style={{ fontSize: 14, fontWeight: "300" }}>
              {props.props.email}
            </Text>
          </View>
        </View>
        <Image
          source={{
            uri: props.props.imageUrl,
          }}
          width={64}
          height={64}
          style={{ borderRadius: 50 }}
        />
      </View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 0.25,
          borderColor: "#ccc",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 4,
          paddingVertical: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 0.22,
          elevation: 3,
          marginHorizontal: 20,
        }}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
