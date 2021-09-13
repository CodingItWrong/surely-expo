import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import NavigationBar from './src/components/NavigationBar';
import {TodoProvider} from './src/data/todos';
import {TokenProvider} from './src/data/token';
import AvailableTodos from './src/screens/AvailableTodos';
import TodoDetail from './src/screens/TodoDetail';

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
      AvailableTodos: '/',
      TodoDetail: '/todos/:id',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TokenProvider>
        <OAuthLoginContainer>
          {({logOut}) => (
            <TodoProvider>
              <NavigationContainer linking={linking}>
                <Stack.Navigator
                  screenOptions={{
                    header: props => (
                      <NavigationBar logOut={logOut} {...props} />
                    ),
                  }}
                >
                  <Stack.Screen
                    name="AvailableTodos"
                    component={AvailableTodos}
                  />
                  <Stack.Screen name="TodoDetail" component={TodoDetail} />
                </Stack.Navigator>
              </NavigationContainer>
            </TodoProvider>
          )}
        </OAuthLoginContainer>
      </TokenProvider>
    </PaperProvider>
  );
}
