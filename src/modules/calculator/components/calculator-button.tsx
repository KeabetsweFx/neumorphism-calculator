import {
  type VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import type { Theme } from "~/theme";
import { makeStyles } from "~/theme";
import { Colors } from "~/theme/colors";
import type { icons } from "~/theme/svg-icons";
import { Box } from "~/ui/layout";
import { Text } from "~/ui/text";
import { VectorIcon } from "~/ui/vector-icon";

import { BUTTON_SIZE, BUTTON_SPACING } from "./constants";

const KeyGradientColors: Record<string, string[]> = {
  gray: [Colors["cadet-blue-100"], Colors["blue-haze"]],
  orange: [Colors["orange-roughy"], Colors.zest],
  white: [Colors.mischka, Colors["athens-gray"]],
} as const;

const Operators: Record<string, keyof typeof icons> = {
  "/": "divide",
  x: "times",
  "-": "minus",
  "+": "plus",
  "=": "equal",
  "+/-": "plus-minus",
};

const GrayGroup = ["C", "+/-", "%", "AC"];
const OrangeGroup = ["/", "x", "-", "+", "="];

export function CalculatorButton(props: ButtonProps) {
  const styles = useStyles();
  const { label: key, isSpread, onKeyPress } = props;
  const spreadStyle = isSpread ? styles.spread : styles.normal;
  const variant = useMemo(() => {
    if (GrayGroup.includes(key)) return "gray";
    if (OrangeGroup.includes(key)) return "orange";
    return "white";
  }, [key]);

  const renderButtonContent = useCallback(() => {
    if (Operators[key]) {
      const color = variant === "orange" ? Colors.white : Colors.charade;
      return <VectorIcon name={Operators[key]} color={color} />;
    }

    return <ButtonText variant={variant}>{key}</ButtonText>;
  }, [key, variant]);

  return (
    <TouchableOpacity
      onPress={() => onKeyPress?.(key)}
      style={[styles.button, spreadStyle]}
      activeOpacity={0.7}
    >
      <InnerShadow style={styles.container} variant={variant}>
        <LinearGradient
          style={styles.content}
          colors={KeyGradientColors[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView style={StyleSheet.absoluteFill} intensity={2} />
          {renderButtonContent()}
        </LinearGradient>
      </InnerShadow>
    </TouchableOpacity>
  );
}

const InnerShadow = createRestyleComponent<
  VariantProps<Theme, "calculatorKeyInnerShadow"> &
    React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "calculatorKeyInnerShadow" })], Box);

const ButtonText = createRestyleComponent<
  VariantProps<Theme, "calculatorKeyText"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "calculatorKeyText" })], Text);

type ButtonProps = {
  onKeyPress?: (key: string) => void;
  label: string;
  isSpread?: boolean;
};

const useStyles = makeStyles((theme) => ({
  button: {
    height: BUTTON_SIZE,
    shadowColor: theme.colors.black,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
  },
  container: {
    borderRadius: 23,
    padding: 7,
  },
  content: {
    flex: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  normal: { width: BUTTON_SIZE },
  spread: { width: BUTTON_SIZE * 2 + BUTTON_SPACING * 2 },
}));
