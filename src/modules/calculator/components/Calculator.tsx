import { LinearGradient } from "expo-linear-gradient";
import { makeStyles, useTheme } from "~/theme";
import { Box } from "~/ui/layout";
import { Text } from "~/ui/text";

import { useCalculator } from "../hooks/useCalculator";
import { CalculatorButton } from "./calculator-button";
import { DISPLAY_WIDTH } from "./constants";

const keys = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export function Calculator() {
  const styles = useStyles();
  const theme = useTheme();
  const { display, handleOnKeyPress } = useCalculator();

  return (
    <LinearGradient
      colors={[theme.colors.mischka, theme.colors["athens-gray"]]}
      style={styles.container}
    >
      <Box
        flex={1}
        mb="$space.9"
        justifyContent="flex-end"
        gap="$space.3"
        px="$space.3"
        alignItems="center"
      >
        <Box width={DISPLAY_WIDTH}>
          <Text variant="calculator-display" numberOfLines={1}>
            {display}
          </Text>
        </Box>
        {keys.map((row, index) => (
          <Box key={index.toString()} flexDirection="row" gap="$space.3">
            {row.map((key) => {
              const isSpread = key === "0" && row.length === 3;
              return (
                <CalculatorButton
                  key={key}
                  label={key}
                  isSpread={isSpread}
                  onKeyPress={handleOnKeyPress}
                />
              );
            })}
          </Box>
        ))}
      </Box>
    </LinearGradient>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors["miscka-100"],
  },
}));
