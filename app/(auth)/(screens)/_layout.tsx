import { ThemeContext } from "@/providers/ThemeProvider";
import { router, Stack } from "expo-router";
import { CaretLeft, SignOut } from "phosphor-react-native";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

const Layout = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // Default animation for forward navigation
        animationTypeForReplace: "pop", // Use "pop" animation for router.replace() to mimic back navigation
        animationDuration: 300, // Duration of the animation
        gestureDirection: "horizontal", // Ensure gesture direction matches the animation
      }}
    >
      <Stack.Screen
        name='Profile'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <SignOut size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              className='flex-row gap-2 items-center'
              onPress={() => router.replace("/")} // Navigate to root
            >
              <CaretLeft size={24} color={colors.text.secondary} />
              <Text style={{ color: colors.text.secondary }}>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='Cart'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerLeft: () => (
            <TouchableOpacity
              className='flex-row gap-2 items-center'
              onPress={() => router.replace("/")} // Navigate to Profile screen
            >
              <CaretLeft size={24} color={colors.text.secondary} />
              <Text style={{ color: colors.text.secondary }}>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='Orders'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerLeft: () => (
            <TouchableOpacity
              className='flex-row gap-2 items-center'
              onPress={() => router.replace("/Profile")} // Navigate to Profile screen
            >
              <CaretLeft size={24} color={colors.text.secondary} />
              <Text style={{ color: colors.text.secondary }}>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='Favourites'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerLeft: () => (
            <TouchableOpacity
              className='flex-row gap-2 items-center'
              onPress={() => router.replace("/Profile")} // Navigate to Profile screen
            >
              <CaretLeft size={24} color={colors.text.secondary} />
              <Text style={{ color: colors.text.secondary }}>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
