import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import "@/styles/global.css";
import { CaretLeft } from "phosphor-react-native";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

const Layout = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background.secondary },
      }}
    >
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
        name='product/[id]'
        options={{ title: "Product Details" }}
      />
      <Stack.Screen
        name='cart'
        options={{
          title: "Cart",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <CaretLeft size={24} color='black' />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='(screens)' options={{ headerShown: false }} />
      <Stack.Screen name='(modal)' options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default Layout;
