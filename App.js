import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello, React Native!</Text>
      </SafeAreaView>
    </>
  );
}
