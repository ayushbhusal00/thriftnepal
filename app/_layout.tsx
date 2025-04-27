import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import "@/styles/global.css";
import { useFonts } from "expo-font"; // Correct import for custom fonts
import { useCallback, useEffect } from "react";
import { View } from "react-native"; // Import View for layout
import { ThemeProvider } from "@/providers/ThemeProvider";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing Clerk Publishable Key, Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

// Prevent autohide of splash screen
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    DMSans: require("../assets/fonts/DMSans-VariableFont_opsz,wght.ttf"),
    "DMSans-Italic": require("../assets/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf"),
  });

  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Handle routing based on auth state
  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/(tabs)");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/(public)");
    }
  }, [isSignedIn, isLoaded, segments, router]);

  // Return null until fonts are loaded or an error occurs
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "red" }}
      onLayout={onLayoutRootView}
    >
      <Slot />
    </View>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider>
            <InitialLayout />
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
