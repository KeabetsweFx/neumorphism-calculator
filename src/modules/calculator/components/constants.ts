import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const BUTTON_SPACING = 5;
export const BUTTON_SIZE = (width * 0.85 - BUTTON_SPACING * 4) / 4;
export const DISPLAY_WIDTH = width * 0.85 + 10;
