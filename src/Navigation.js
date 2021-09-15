import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationBar from './components/NavigationBar';
import CustomNavigationDrawer from './components/NavigationDrawer';
import AvailableTodos from './screens/AvailableTodos';
import CompletedTodos from './screens/CompletedTodos';
import DeletedTodos from './screens/DeletedTodos';
import FutureTodos from './screens/FutureTodos';
import TodoDetail from './screens/TodoDetail';
import TomorrowTodos from './screens/TomorrowTodos';

const linking = {
  config: {
    screens: {
      Available: {
        screens: {
          AvailableTodos: '/todos/available',
          AvailableTodoDetail: '/todos/available/:id',
        },
      },
      Tomorrow: {
        screens: {
          TomorrowTodos: '/todos/tomorrow',
          TomorrowTodoDetail: '/todos/tomorrow/:id',
        },
      },
      Future: {
        screens: {
          FutureTodos: '/todos/future',
          FutureTodoDetail: '/todos/future/:id',
        },
      },
      Completed: {
        screens: {
          CompletedTodos: '/todos/completed',
          CompletedTodoDetail: '/todos/completed/:id',
        },
      },
      Deleted: {
        screens: {
          DeletedTodos: '/todos/deleted',
          DeletedTodoDetail: '/todos/deleted/:id',
        },
      },
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
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomNavigationDrawer {...props} />}
    >
      <Drawer.Screen
        name="Available"
        component={Available}
        options={{link: '/todos/available'}}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={Tomorrow}
        options={{link: '/todos/tomorrow'}}
      />
      <Drawer.Screen
        name="Future"
        component={Future}
        options={{link: '/todos/future'}}
      />
      <Drawer.Screen
        name="Completed"
        component={Completed}
        options={{link: '/todos/completed'}}
      />
      <Drawer.Screen
        name="Deleted"
        component={Deleted}
        options={{link: '/todos/deleted'}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigation;
