import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Todos from './Todos';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Todos />
      </SafeAreaView>
    </PaperProvider>
  );
}
