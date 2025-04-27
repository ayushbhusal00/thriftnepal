import React, { createContext, useEffect } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "@/utils/color-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: typeof themes.light;
}>({
  theme: "light",
  toggleTheme: () => {},
  colors: themes.light,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setColorScheme(storedTheme as "light" | "dark");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme as "light" | "dark",
        toggleTheme,
        colors: themes[colorScheme as "light" | "dark"],
      }}
    >
      <View className='flex-1 bg-background-primary'>{children}</View>
    </ThemeContext.Provider>
  );
};
