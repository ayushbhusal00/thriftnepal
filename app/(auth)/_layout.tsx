import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";
import "@/styles/global.css";
import { CaretLeft } from "phosphor-react-native";
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
        name='cart'
        options={{
          title: "Cart",
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.dismissTo("/")}>
                <CaretLeft size={24} color='black' />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
