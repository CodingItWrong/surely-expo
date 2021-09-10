import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Auth from './Auth';
import NavigationBar from './NavigationBar';
import Todo from './Todo';
import Todos from './Todos';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50',
  },
};

const linking = {
  config: {
    screens: {
      Todos: '/',
      Todo: '/todos/:id',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Auth>
        {({logOut}) => (
          <NavigationContainer linking={linking}>
            <Stack.Navigator
              screenOptions={{
                header: props => <NavigationBar logOut={logOut} {...props} />,
              }}
            >
              <Stack.Screen name="Todos" component={Todos} />
              <Stack.Screen name="Todo" component={Todo} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </Auth>
    </PaperProvider>
  );
}
