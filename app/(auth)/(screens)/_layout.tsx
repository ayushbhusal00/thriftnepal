import { ThemeContext } from "@/providers/ThemeProvider";
import { router, Stack } from "expo-router";
import { CaretLeft, SignOut } from "phosphor-react-native";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
const Layout = () => {
  const { colors } = useContext(ThemeContext);
  const { signOut } = useAuth();
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
        name='Orders'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerLeft: () => (
            <TouchableOpacity
              className='flex-row gap-2 items-center'
              onPress={() => router.dismissTo("../profile")} // Navigate to Profile screen
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
              onPress={() => router.dismissTo("/profile")} // Navigate to Profile screen
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
