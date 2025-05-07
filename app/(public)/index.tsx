import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/providers/ThemeProvider";
import { CaretRight } from "phosphor-react-native";

const Page = () => {
  const { theme, colors } = useContext(ThemeContext);
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  //get device safe bottom height
  const bottomHeight =
    Dimensions.get("window").height - Dimensions.get("screen").height;

  //get window width and height
  const windowWidth = Dimensions.get("window").width;
  const handleFacebookLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startFacebookOAuthFlow();
      console.log(
        `🚀 handleFacebookLogin ~ createdSettionID: `,
        createdSessionId
      );
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      console.log(
        `🚀 handleGoogleLogin ~ createdSettionID: `,
        createdSessionId
      );
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      }}
    >
      <Image
        source={require("@/assets/images/login.png")}
        style={{ width: windowWidth, height: "40%", marginBottom: 16 }}
      />
      <View
        className={`w-full items-center justify-center flex-1 flex-col gap-4`}
      >
        <View className='flex flex-col gap-1'>
          <Text
            style={{
              color: colors.text.primary,
              textAlign: "center",
            }}
            className='text-3xl font-bold'
          >
            Welcome to{" "}
            <Text style={{ color: colors.brand.default }}>ThriftyNepal</Text>
          </Text>
          <Text
            className='text-lg'
            style={{
              color: colors.text.secondary,
            }}
          >
            Sign in to your account to get started
          </Text>
        </View>
        <View className='flex-col p-6 gap-4'>
          <TouchableOpacity
            style={{
              borderColor: colors.background.border,
              backgroundColor:
                theme === "light"
                  ? colors.background.primary
                  : colors.background.secondary,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderStyle: "solid",
              width: "90%",
            }}
            onPress={handleFacebookLogin}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Image
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("@/assets/images/facebook.png")}
              />
              <Text
                style={{ color: colors.text.primary }}
                className='text-lg text-bold'
              >
                Continue with Facebook
              </Text>
            </View>
            <CaretRight
              size={20}
              weight='regular'
              color={colors.text.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: colors.background.border,
              backgroundColor:
                theme === "light"
                  ? colors.background.primary
                  : colors.background.secondary,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onPress={handleGoogleLogin}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
              }}
            >
              <Image
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("@/assets/images/google.png")}
              />
              <Text
                style={{ color: colors.text.primary }}
                className='text-lg text-bold'
              >
                Continue with Google
              </Text>
            </View>
            <CaretRight
              size={20}
              weight='regular'
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        </View>
        <Text className='text-lg text-bold text-blue-500'>
          <Text style={{ color: colors.text.primary }}>I agree to the </Text>{" "}
          Privacy & Terms
        </Text>
      </View>
    </View>
  );
};

export default Page;
