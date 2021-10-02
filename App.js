import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import {TokenProvider} from './src/data/token';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
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
