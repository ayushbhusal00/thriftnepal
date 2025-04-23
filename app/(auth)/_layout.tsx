import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";
import "@/styles/global.css";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='StoriesViewer' options={{ headerShown: false }} />
      <Stack.Screen
        name='paymentConfirmation'
        options={{ title: "Confirm Payment" }}
      />
      <Stack.Screen
        name='paymentWebview'
        options={{ title: "eSewa Payment" }}
      />
      <Stack.Screen
        name='create'
        options={{
          headerShown: false,
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
