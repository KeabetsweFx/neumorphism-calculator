import "react-native-gesture-handler";

import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { theme } from "~/theme";

import RootStack from "./src/navigation";

export default function App() {
  const [loaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <RootStack />
    </ThemeProvider>
  );
}
