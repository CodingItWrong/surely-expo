import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import NavigationBar from './NavigationBar';
import OAuthLoginForm from './OAuthLoginForm';
import Todo from './Todo';
import Todos from './Todos';
import {StoreProvider} from './store';
import {TokenProvider} from './token';

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
      <TokenProvider>
        <StoreProvider>
          <OAuthLoginForm>
            {({logOut}) => (
              <NavigationContainer linking={linking}>
                <Stack.Navigator
                  screenOptions={{
                    header: props => (
                      <NavigationBar logOut={logOut} {...props} />
                    ),
                  }}
                >
                  <Stack.Screen name="Todos" component={Todos} />
                  <Stack.Screen name="Todo" component={Todo} />
                </Stack.Navigator>
              </NavigationContainer>
            )}
          </OAuthLoginForm>
        </StoreProvider>
      </TokenProvider>
    </PaperProvider>
  );
}
