import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import {TokenProvider} from './src/data/token';
import theme from './src/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <TokenProvider>
          <OAuthLoginContainer>
            {({logOut}) => <Navigation logOut={logOut} />}
          </OAuthLoginContainer>
        </TokenProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
