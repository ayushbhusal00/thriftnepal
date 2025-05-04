import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name='addProduct'
        options={{ headerShown: false, title: "Add Product" }}
      />
    </Stack>
  );
}
