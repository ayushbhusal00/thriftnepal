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
import { RoleProvider } from "@/providers/RoleProvider";

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
    "Missing Convex URL. Please set EXPO_PUBLIC ⦺ EXPO_PUBLIC_CONVEX_URL in your .env"
  );
}

const convex = new ConvexReactClient(convexUrl);

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    DMSans: require("../assets/fonts/DMSans-VariableFont_opsz,wght.ttf"),
    "DMSans-Italic": require("../assets/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf"),
  });

  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [hasRedirected, setHasRedirected] = useState(false);

  const { userProfile, isLoading: isProfileLoading } = useUserProfile();
  const userRole = isSignedIn
    ? ((userProfile?.role as "user" | "seller" | null) ?? null)
    : null;

  if (__DEV__) {
    console.log("User Role: ", userRole);
    console.log("Segments: ", segments);
  }

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && isLoaded && !isProfileLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoaded, isProfileLoading]);

  useEffect(() => {
    if (!isLoaded || !fontsLoaded || isProfileLoading || hasRedirected) return;

    if (!segments || !segments.length) {
      if (__DEV__) {
        console.log("Segments not ready:", segments);
      }
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inAdminGroup = segments[0] === "(admin)";
    const inPublicGroup = segments[0] === "(public)";

    if (isSignedIn) {
      if (inAdminGroup && userRole === "user") {
        router.replace("/(auth)/(tabs)");
        setHasRedirected(true);
      } else if (userRole === "seller" && !inAdminGroup) {
        router.replace("/(admin)/(tabs)");
        setHasRedirected(true);
      } else if (!inAuthGroup && !inAdminGroup) {
        router.replace("/(auth)/(tabs)");
        setHasRedirected(true);
      }
    } else {
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

  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  if (!fontsLoaded || !isLoaded || isProfileLoading || !segments) {
    if (__DEV__) {
      console.log("Loading State:", {
        fontsLoaded,
        isLoaded,
        isProfileLoading,
        segments,
      });
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
            <RoleProvider>
              <InitialLayout />
            </RoleProvider>
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
