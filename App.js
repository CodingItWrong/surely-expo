import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Auth from './Auth';
import NavigationBar from './NavigationBar';
import TodoDetail from './TodoDetail';
import TodoList from './TodoList';
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
      TodoList: '/',
      TodoDetail: '/todos/:id',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TokenProvider>
        <StoreProvider>
          <Auth>
            {({logOut}) => (
              <NavigationContainer linking={linking}>
                <Stack.Navigator
                  screenOptions={{
                    header: props => (
                      <NavigationBar logOut={logOut} {...props} />
                    ),
                  }}
                >
                  <Stack.Screen name="TodoList" component={TodoList} />
                  <Stack.Screen name="TodoDetail" component={TodoDetail} />
                </Stack.Navigator>
              </NavigationContainer>
            )}
          </Auth>
        </StoreProvider>
      </TokenProvider>
    </PaperProvider>
  );
}
