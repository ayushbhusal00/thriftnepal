import { Platform } from "react-native";

export const fonts = {
  default: Platform.select({
    ios: "Switzer-Variable",
    android: "Switzer-Variable",
  }),
  heading: Platform.select({
    ios: "Co-Headline",
    android: "Co-Headline",
  }),
};

export const fontWeights = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};
