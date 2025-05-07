import { ThemeContext } from "@/providers/ThemeProvider";
import { router, Stack } from "expo-router";
import { CaretLeft, X } from "phosphor-react-native";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const { colors } = useContext(ThemeContext);
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name='AddProduct'
        options={{
          headerShown: false,
          title: "Add Product",
          headerTintColor: colors.text.primary,
          headerStyle: { backgroundColor: colors.background.secondary },
          headerRight: () => (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",

                gap: 5,
              }}
              onPress={() => {
                router.dismiss();
              }}
            >
              <X weight='regular' size={24} color={colors.text.primary} />
              <Text style={{ color: colors.text.primary }}>Cancel</Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
