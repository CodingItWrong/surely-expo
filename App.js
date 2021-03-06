import {StatusBar} from 'expo-status-bar';
// for some reason PaperProvider errors without the React import
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {en, registerTranslation} from 'react-native-paper-dates';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import ScreenBackground from './src/components/ScreenBackground';
import TokenLoadBuffer from './src/components/TokenLoadBuffer';
import {TokenProvider} from './src/data/token';
import useTheme from './src/useTheme';

registerTranslation('en', en);

// TODO: implement delay after loading token in a simpler way

export default function App() {
  const theme = useTheme();
  return (
    <TokenProvider>
      <TokenLoadBuffer>
        <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          <SafeAreaProvider>
            <ScreenBackground>
              <Navigation />
            </ScreenBackground>
          </SafeAreaProvider>
        </PaperProvider>
      </TokenLoadBuffer>
    </TokenProvider>
  );
}
