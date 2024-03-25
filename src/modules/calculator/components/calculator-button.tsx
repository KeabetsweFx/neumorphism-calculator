import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { makeStyles, useTheme } from "~/theme";
import { Colors } from "~/theme/colors";
import type { icons } from "~/theme/svg-icons";
import { Box } from "~/ui/layout";
import { Text } from "~/ui/text";
import { VectorIcon } from "~/ui/vector-icon";

import { BUTTON_SIZE, BUTTON_SPACING } from "./constants";

const KeyStyles = {
  gray: {
    gradient: [Colors["cadet-blue-100"], Colors["blue-haze"]],
    styles: {
      shadowColor: Colors.heather,
      backgroundColor: Colors["cadet-blue-50"],
    },
    textColor: "charade",
  },
  orange: {
    gradient: [Colors["orange-roughy"], Colors.zest],
    styles: {
      shadowColor: Colors["zeus-50"],
      backgroundColor: Colors["hot-cinnamon"],
    },
    textColor: "white",
  },
  white: {
    gradient: [Colors.mischka, Colors["athens-gray"]],
    styles: {
      backgroundColor: Colors.mystic,
      shadowColor: Colors["mystic-20"],
    },
    textColor: "charade",
  },
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
  const theme = useTheme();
  const { label, isSpread, onKeyPress } = props;
  const spreadStyle = isSpread ? styles.spread : styles.normal;
  const {
    gradient,
    styles: inner,
    textColor,
  } = useMemo(() => {
    if (GrayGroup.includes(label)) return KeyStyles.gray;
    if (OrangeGroup.includes(label)) return KeyStyles.orange;
    return KeyStyles.white;
  }, [label]);

  const renderButtonContent = useCallback(() => {
    const color = theme.colors[textColor];
    if (Operators[label])
      return <VectorIcon name={Operators[label]} color={color} />;
    return (
      <Text variant="calculator-button" color={textColor}>
        {label}
      </Text>
    );
  }, [label, theme.colors, textColor]);

  return (
    <TouchableOpacity
      onPress={() => onKeyPress?.(label)}
      style={[styles.button, spreadStyle]}
      activeOpacity={0.7}
    >
      <Box style={[styles.container, inner]}>
        <LinearGradient
          style={styles.content}
          colors={[gradient[0], gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView style={StyleSheet.absoluteFill} intensity={2} />
          {renderButtonContent()}
        </LinearGradient>
      </Box>
    </TouchableOpacity>
  );
}

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
    flex: 1,
    borderRadius: 23,
    padding: 7,
    shadowOffset: { height: 4, width: 4 },
    shadowRadius: 4,
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
