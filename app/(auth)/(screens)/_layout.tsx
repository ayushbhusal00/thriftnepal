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
      }}
    >
      <Stack.Screen
        name='Profile'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },

          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => router.dismissTo("/")}>
                <SignOut size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                className='flex-row gap-2 items-center'
                onPress={() => router.dismissTo("/")}
              >
                <CaretLeft size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.secondary }}>Back</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='Cart'
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },

          headerLeft: () => {
            return (
              <TouchableOpacity
                className='flex-row gap-2 items-center'
                onPress={() => router.dismissTo("/")}
              >
                <CaretLeft size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.secondary }}>Back</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name='Orders' />
    </Stack>
  );
};
export default Layout;
