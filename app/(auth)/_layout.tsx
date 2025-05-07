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
        options={{
          title: "Confirm Payment",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
        }}
      />
      <Stack.Screen
        name='paymentWebview'
        options={{
          title: "eSewa Payment",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
        }}
      />
      <Stack.Screen
        name='product/[id]'
        options={{
          headerShown: false,
          title: "Product Details",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
        }}
      />
      <Stack.Screen name='(screens)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(modal)'
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name='(payment)/success'
        options={{
          headerShown: false,
          title: "Payment Failed",
          presentation: "modal",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
        }}
      />
      <Stack.Screen
        name='(payment)/failure'
        options={{
          title: "Payment Failed",
          presentation: "modal",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
        }}
      />
    </Stack>
  );
};

export default Layout;
