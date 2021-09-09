import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Todos from './Todos';
createNativeStackNavigator;
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Todos" component={Todos} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
