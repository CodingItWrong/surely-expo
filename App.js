import {StatusBar} from 'expo-status-bar';
// for some reason PaperProvider errors without the React import
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import {TokenProvider} from './src/data/token';
import useTheme from './src/useTheme';

export default function App() {
  const theme = useTheme();
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
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
