import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NavigationBar from './NavigationBar';
import Todos from './Todos';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{header: props => <NavigationBar {...props} />}}
        >
          <Stack.Screen name="Todos" component={Todos} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
