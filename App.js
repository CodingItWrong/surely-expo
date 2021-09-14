import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import OAuthLoginContainer from './src/auth/OAuthLoginContainer';
import NavigationBar from './src/components/NavigationBar';
import {TodoProvider} from './src/data/todos';
import {TokenProvider} from './src/data/token';
import AvailableTodos from './src/screens/AvailableTodos';
import CompletedTodos from './src/screens/CompletedTodos';
import DeletedTodos from './src/screens/DeletedTodos';
import FutureTodos from './src/screens/FutureTodos';
import TodoDetail from './src/screens/TodoDetail';
import TomorrowTodos from './src/screens/TomorrowTodos';

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
      AvailableTodoDetail: '/todos/available/:id',
      TomorrowTodos: '/todos/tomorrow',
      TomorrowTodoDetail: '/todos/tomorrow/:id',
      FutureTodos: '/todos/future',
      FutureTodoDetail: '/todos/future/:id',
      CompletedTodos: '/todos/completed',
      CompletedTodoDetail: '/todos/completed/:id',
      DeletedTodos: '/todos/deleted',
      DeletedTodoDetail: '/todos/deleted/:id',
    },
  },
};

const Drawer = createDrawerNavigator();

const AvailableStack = createNativeStackNavigator();
const Available = () => (
  <AvailableStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <AvailableStack.Screen
      name="AvailableTodos"
      component={AvailableTodos}
      options={{title: 'Available'}}
    />
    <AvailableStack.Screen
      name="AvailableTodoDetail"
      component={TodoDetail}
      options={{title: 'Todo'}}
    />
  </AvailableStack.Navigator>
);

const TomorrowStack = createNativeStackNavigator();
const Tomorrow = () => (
  <TomorrowStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <TomorrowStack.Screen
      name="TomorrowTodos"
      component={TomorrowTodos}
      options={{title: 'Tomorrow'}}
    />
    <TomorrowStack.Screen
      name="TomorrowTodoDetail"
      component={TodoDetail}
      options={{title: 'Todo'}}
    />
  </TomorrowStack.Navigator>
);

const FutureStack = createNativeStackNavigator();
const Future = () => (
  <FutureStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <FutureStack.Screen
      name="FutureTodos"
      component={FutureTodos}
      options={{title: 'Future'}}
    />
    <FutureStack.Screen
      name="FutureTodoDetail"
      component={TodoDetail}
      options={{title: 'Todo'}}
    />
  </FutureStack.Navigator>
);

const CompletedStack = createNativeStackNavigator();
const Completed = () => (
  <CompletedStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <CompletedStack.Screen
      name="CompletedTodos"
      component={CompletedTodos}
      options={{title: 'Completed'}}
    />
    <CompletedStack.Screen
      name="CompletedTodoDetail"
      component={TodoDetail}
      options={{title: 'Todo'}}
    />
  </CompletedStack.Navigator>
);

const DeletedStack = createNativeStackNavigator();
const Deleted = () => (
  <DeletedStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <DeletedStack.Screen
      name="DeletedTodos"
      component={DeletedTodos}
      options={{title: 'Deleted'}}
    />
    <DeletedStack.Screen
      name="DeletedTodoDetail"
      component={TodoDetail}
      options={{title: 'Todo'}}
    />
  </DeletedStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer linking={linking}>
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Available" component={Available} />
      <Drawer.Screen name="Tomorrow" component={Tomorrow} />
      <Drawer.Screen name="Future" component={Future} />
      <Drawer.Screen name="Completed" component={Completed} />
      <Drawer.Screen name="Deleted" component={Deleted} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TokenProvider>
        <OAuthLoginContainer>
          {({logOut}) => (
            <TodoProvider>
              <Navigation />
            </TodoProvider>
          )}
        </OAuthLoginContainer>
      </TokenProvider>
    </PaperProvider>
  );
}
