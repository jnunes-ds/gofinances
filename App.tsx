import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";

import AppLoading from "expo-app-loading";

import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";

import { AuthProvider, useAuth } from "./src/hooks/auth";

export default function App() {
  7;
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  useEffect(() => {
    if (!fontsLoaded || userStorageLoading) {
      (async () => {
        await SplashScreen.preventAutoHideAsync();
      })();
    } else {
      (async () => {
        await SplashScreen.hideAsync();
      })();
      setLoading(false);
    }
  }, [fontsLoaded, userStorageLoading]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        animated={true}
        showHideTransition="fade"
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
