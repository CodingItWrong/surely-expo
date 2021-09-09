import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Todos from './Todos';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Todos />
      </SafeAreaView>
    </>
  );
}
