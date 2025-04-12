import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(modal)/create'
        options={{
          presentation: "modal",
          title: "New Product",
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => router.dismiss()}>
                <Ionicons name='close' size={24} color='black' />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
