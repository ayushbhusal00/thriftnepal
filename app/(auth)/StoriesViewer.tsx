import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const StoriesViewer = () => {
  const { userId, storyImageUrls, userImageUrl } = useLocalSearchParams();
  const router = useRouter();
  const images = Array.isArray(storyImageUrls)
    ? storyImageUrls
    : JSON.parse(storyImageUrls as string); // Handle both string and array types
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const duration = 3000; // 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story or go back
          if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return 0;
          } else {
            router.back(); // Go back when all stories are viewed
            return 0;
          }
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Handle manual navigation
  const handlePress = (side: "left" | "right") => {
    setProgress(0); // Reset progress
    if (side === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (side === "right" && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (side === "right" && currentIndex === images.length - 1) {
      router.back(); // Go back if at the last story
    }
  };

  if (!images || images.length === 0) {
    return (
      <SafeAreaView className='flex-1 bg-black'>
        <Text className='text-white text-center mt-20'>
          No stories available
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1'>
        {/* Progress Bars */}
        <View className='flex-row px-2 mt-2'>
          {images.map((_: string, index: number) => (
            <View
              key={index}
              className='flex-1 h-1 bg-gray-600 mx-1 rounded-full overflow-hidden'
            >
              {index === currentIndex ? (
                <View
                  className='h-full bg-white'
                  style={{ width: `${progress}%` }}
                />
              ) : index < currentIndex ? (
                <View className='h-full bg-white w-full' />
              ) : null}
            </View>
          ))}
        </View>

        {/* Story Image */}
        <Image
          source={{ uri: images[currentIndex] }}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.8,
            resizeMode: "contain",
          }}
        />

        {/* User Info */}
        <View className='absolute top-12 left-4 flex-row items-center'>
          {userImageUrl ? (
            <Image
              source={{ uri: userImageUrl as string }}
              className='w-10 h-10 rounded-full border border-purple-200'
            />
          ) : (
            <Text className='text-white'>No Image</Text>
          )}
          <Text className='text-white text-lg font-semibold ml-2'>
            {userId}
          </Text>
        </View>

        {/* Navigation Areas */}
        <Pressable
          className='absolute top-0 left-0 w-1/3 h-full'
          onPress={() => handlePress("left")}
        />
        <Pressable
          className='absolute top-0 right-0 w-2/3 h-full'
          onPress={() => handlePress("right")}
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["#00000050", "#00000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SCREEN_WIDTH,
            height: 100,
          }}
        />
        <LinearGradient
          colors={["#00000000", "#00000050"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: SCREEN_WIDTH,
            height: 100,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default StoriesViewer;
