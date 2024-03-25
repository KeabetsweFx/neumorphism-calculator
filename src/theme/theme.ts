import { createTheme, useTheme as useRestyleTheme } from "@shopify/restyle";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { Colors } from "./colors";
import { Spacing } from "./spacing";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

const theme = createTheme({
  colors: Colors,
  spacing: Spacing,
  borderRadii: {
    $rounded: 4,
    "$rounded.none": 0,
    "$rounded.sm": 2,
    "$rounded.md": 6,
    "$rounded.lg": 8,
    "$rounded.xl": 12,
    "$rounded.2xl": 16,
    "$rounded.3xl": 24,
    "$rounded.full": 9999,
  },
  textVariants: {
    title1: {
      fontSize: 34,
      fontWeight: "600",
      lineHeight: 41,
      fontFamily: "Poppins-SemiBold",
    },
    title2: {
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 34,
      fontFamily: "Poppins-SemiBold",
    },
    title3: {
      fontSize: 22,
      fontWeight: "600",
      lineHeight: 28,
      fontFamily: "Poppins-SemiBold",
    },
    headline: {
      fontSize: 17,
      fontWeight: "600",
      lineHeight: 22,
      fontFamily: "Poppins-SemiBold",
    },
    body: {
      fontSize: 17,
      fontWeight: "400",
      lineHeight: 22,
      fontFamily: "Poppins-Regular",
    },
    callout: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 21,
      fontFamily: "Poppins-Regular",
    },
    subhead: {
      fontSize: 15,
      fontWeight: "400",
      lineHeight: 20,
      fontFamily: "Poppins-Regular",
    },
    footnote: {
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 18,
      fontFamily: "Poppins-Regular",
    },
    caption1: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 16,
      fontFamily: "Poppins-Regular",
    },
    caption2: {
      fontSize: 11,
      fontWeight: "400",
      lineHeight: 13,
      fontFamily: "Poppins-Regular",
    },
    "calculator-button": {
      fontSize: 23,
      fontFamily: "Poppins-Regular",
    },
    "calculator-display": {
      fontSize: 56,
      fontFamily: "Poppins-Regular",
      textAlign: "right",
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export const useTheme = () => {
  return useRestyleTheme<Theme>();
};

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T,
) => {
  return () => {
    return styles(theme);
  };
};

export type Theme = typeof theme;
export default theme;
