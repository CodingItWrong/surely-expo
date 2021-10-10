import {StatusBar} from 'expo-status-bar';
// for some reason PaperProvider errors without the React import
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import TokenLoadBuffer from './src/components/TokenLoadBuffer';
import {TokenProvider} from './src/data/token';
import useTheme from './src/useTheme';
// TODO: implement delay after loading token in a simpler way

export default function App() {
  const theme = useTheme();
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <TokenProvider>
          <TokenLoadBuffer>{() => <Navigation />}</TokenLoadBuffer>
        </TokenProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
