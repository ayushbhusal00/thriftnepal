import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import "@/styles/global.css";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useUserProfile } from "@/hooks/useUserProfile";

const clerkPublishableKey: string =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL in your .env"
  );
}

const convex = new ConvexReactClient(convexUrl);

// Prevent autohide of splash screen
SplashScreen.preventAutoHideAsync();

interface UserProfile {
  role: "user" | "seller" | null;
}

const InitialLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    DMSans: require("../assets/fonts/DMSans-VariableFont_opsz,wght.ttf"),
    "DMSans-Italic": require("../assets/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf"),
  });

  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [hasRedirected, setHasRedirected] = useState(false); // Track initial redirect

  // Only call useUserProfile when signed in
  const { userProfile, isLoading: isProfileLoading } = isSignedIn
    ? useUserProfile()
    : { userProfile: null, isLoading: false };
  const userRole = (userProfile?.role as "user" | "seller" | null) ?? null;

  if (__DEV__) {
    console.log("User Role: ", userRole);
    console.log("Segments: ", segments);
  }

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && isLoaded && !isProfileLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoaded, isProfileLoading]);

  // Handle routing based on auth state
  useEffect(() => {
    if (!isLoaded || !fontsLoaded || isProfileLoading || hasRedirected) return;

    // Ensure segments is valid
    if (!segments || !segments[0]) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAdminGroup = segments[0] === "(admin)";
    const inPublicGroup = segments[0] === "(public)";

    if (isSignedIn) {
      // Signed-in user logic
      if (inAdminGroup && userRole === "user") {
        // User is not allowed in admin routes
        router.replace("/(auth)/(tabs)");
        setHasRedirected(true);
      } else if (userRole === "seller" && !inAdminGroup) {
        // Seller should be in admin routes
        router.replace("/(admin)/(tabs)");
        setHasRedirected(true);
      } else if (!inAuthGroup && !inAdminGroup) {
        // Default for signed-in users: go to auth tabs
        router.replace("/(auth)/(tabs)");
        setHasRedirected(true);
      }
    } else {
      // Signed-out user logic
      if (inAuthGroup || inAdminGroup) {
        router.replace("/(public)");
        setHasRedirected(true);
      }
    }
  }, [
    isSignedIn,
    isLoaded,
    fontsLoaded,
    isProfileLoading,
    userRole,
    segments,
    router,
    hasRedirected,
  ]);

  // Handle font loading errors
  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  // Add early return for loading states
  if (!fontsLoaded || !isLoaded || isProfileLoading) {
    if (__DEV__) {
      console.log("Loading State:", {
        fontsLoaded,
        isLoaded,
        isProfileLoading,
      });
    }
    return null;
  }

  // Ensure segments is available before proceeding
  if (!segments) {
    if (__DEV__) {
      console.log("No segments available yet");
    }
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
