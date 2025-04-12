import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
const Page = () => {
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

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
    <View className='flex-1 p-6 items-center justify-center'>
      <Text className='color-red-500'>Index Name</Text>
      <View className='flex flex-row gap-4'>
        <TouchableOpacity
          className='flex-1 bg-blue-500 rounded p-2'
          onPress={handleFacebookLogin}
        >
          <Text className='text-white'>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=' flex-1 bg-red-500 rounded p-2'
          onPress={handleGoogleLogin}
        >
          <Text className='text-white'>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
