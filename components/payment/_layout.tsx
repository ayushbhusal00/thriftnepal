import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='webview'
        options={{ title: "Processing Payment", headerShown: false }}
      />
    </Stack>
  );
}
