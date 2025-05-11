// @/providers/RoleProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUserProfile } from "@/hooks/useUserProfile";

type RoleContextType = {
  role: string | null;
  switchRole: (newRole: string) => Promise<void>;
  canSwitchToSeller: boolean;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const { userProfile } = useUserProfile();
  const router = useRouter();

  // Initialize role from AsyncStorage or userProfile
  useEffect(() => {
    const initializeRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      const profileRole = userProfile?.role || "user";
      const initialRole = storedRole || profileRole;
      setRole(initialRole);
    };
    initializeRole();
  }, [userProfile]);

  // Function to switch roles
  const switchRole = async (newRole: string) => {
    await AsyncStorage.setItem("userRole", newRole);
    setRole(newRole);
    console.log(`User switched to ${newRole}`);
    if (newRole === "seller") {
      router.replace("/(admin)/(tabs)");
    } else {
      router.replace("/(auth)/(tabs)");
    }
  };

  // Determine if the user can switch to seller (only sellers can switch)
  const canSwitchToSeller = role === "seller";

  return (
    <RoleContext.Provider value={{ role, switchRole, canSwitchToSeller }}>
      {children}
    </RoleContext.Provider>
  );
};

// Hook to use the RoleContext
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
