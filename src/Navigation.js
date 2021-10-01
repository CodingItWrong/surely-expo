import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationBar from './components/NavigationBar';
import CustomNavigationDrawer from './components/NavigationDrawer';
import CategoryDetail from './screens/CategoryDetail';
import CategoryList from './screens/CategoryList';
import {createTodoDetail} from './screens/TodoDetail';
import AvailableTodos from './screens/TodoList/Available';
import CompletedTodos from './screens/TodoList/Completed';
import DeletedTodos from './screens/TodoList/Deleted';
import FutureTodos from './screens/TodoList/Future';
import TomorrowTodos from './screens/TodoList/Tomorrow';

const linking = {
  config: {
    screens: {
      Available: {
        initialRouteName: 'AvailableTodos',
        screens: {
          AvailableTodos: '/todos/available',
          AvailableTodoDetail: '/todos/available/:id',
        },
      },
      Tomorrow: {
        initialRouteName: 'TomorrowTodos',
        screens: {
          TomorrowTodos: '/todos/tomorrow',
          TomorrowTodoDetail: '/todos/tomorrow/:id',
        },
      },
      Future: {
        initialRouteName: 'FutureTodos',
        screens: {
          FutureTodos: '/todos/future',
          FutureTodoDetail: '/todos/future/:id',
        },
      },
      Completed: {
        initialRouteName: 'CompletedTodos',
        screens: {
          CompletedTodos: '/todos/completed',
          CompletedTodoDetail: '/todos/completed/:id',
        },
      },
      Deleted: {
        initialRouteName: 'DeletedTodos',
        screens: {
          DeletedTodos: '/todos/deleted',
          DeletedTodoDetail: '/todos/deleted/:id',
        },
      },
      Categories: {
        initialRouteName: 'CategoryList',
        screens: {
          CategoryList: '/categories',
          CategoryDetail: '/categories/:id',
        },
      },
    },
  },
};

const Drawer = createDrawerNavigator();

const AvailableStack = createNativeStackNavigator();
const Available = () => (
  <AvailableStack.Navigator
    initialRouteName="AvailableTodos"
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
      component={createTodoDetail('AvailableTodos')}
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
      component={createTodoDetail('TomorrowTodos')}
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
      component={createTodoDetail('FutureTodos')}
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
      component={createTodoDetail('CompletedTodos')}
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
      component={createTodoDetail('DeletedTodos')}
      options={{title: 'Todo'}}
    />
  </DeletedStack.Navigator>
);

const CategoryStack = createNativeStackNavigator();
const Categories = () => (
  <CategoryStack.Navigator
    screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}
  >
    <CategoryStack.Screen
      name="CategoryList"
      component={CategoryList}
      options={{title: 'Categories'}}
    />
    <CategoryStack.Screen
      name="CategoryDetail"
      component={CategoryDetail}
      options={{title: 'Category'}}
    />
  </CategoryStack.Navigator>
);

const Navigation = ({logOut}) => (
  <NavigationContainer linking={linking}>
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => (
        <CustomNavigationDrawer {...props} logOut={logOut} />
      )}
    >
      <Drawer.Screen name="Available" component={Available} />
      <Drawer.Screen name="Tomorrow" component={Tomorrow} />
      <Drawer.Screen name="Future" component={Future} />
      <Drawer.Screen name="Completed" component={Completed} />
      <Drawer.Screen name="Deleted" component={Deleted} />
      <Drawer.Screen name="Categories" component={Categories} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Navigation;
