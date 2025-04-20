import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
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
    <View className='flex-1 items-start justify-start bg-[#ffffff]'>
      <Image
        source={require("@/assets/images/login.png")}
        style={{ width: windowWidth, height: "40%" }}
        className={`mb-4`}
      />
      <View
        className={`w-full items-center justify-center flex-1 flex-col gap-4`}
      >
        <View className='flex flex-col gap-1'>
          <Text className='text-3xl font-bold'>
            Welcome to <Text className='text-[#AD5691]'>ThriftyNepal</Text>
          </Text>
          <Text className='text-lg text-neutral-500'>
            Sign in to your account to get started
          </Text>
        </View>
        <View className='flex-col p-6 gap-4'>
          <TouchableOpacity
            className='border-solid border border-neutral-200 rounded-md elevation-md px-6 py-3 flex-row items-center gap-4'
            onPress={handleFacebookLogin}
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
            <Text className='text-lg text-bold text-neutral-900'>
              Continue with Facebook
            </Text>
            <Ionicons name='chevron-forward-outline' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            className='border-solid border border-neutral-200 rounded-md elevation-md px-6 py-3 flex-row items-center gap-4'
            onPress={handleGoogleLogin}
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
            <Text className='text-lg text-bold text-neutral-900'>
              Continue with Google
            </Text>
            <Ionicons name='chevron-forward-outline' size={20} color='black' />
          </TouchableOpacity>
        </View>
        <Text className='text-lg text-bold text-blue-500'>
          Continue as guest
        </Text>
      </View>
    </View>
  );
};

export default Page;
