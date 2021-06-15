import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppLoading from 'expo-app-loading';

import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';
import { Routes } from './src/routes';

import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
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

