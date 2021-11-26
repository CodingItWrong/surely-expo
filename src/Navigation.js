import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import throttle from 'lodash/throttle';
import {useEffect, useRef, useState} from 'react';
import {large, useBreakpoint} from './breakpoints';
import CustomNavigationBar from './components/NavigationBar';
import CustomNavigationDrawer from './components/NavigationDrawer';
import {useToken} from './data/token';
import AboutScreen from './screens/About/AboutScreen';
import PrivacyScreen from './screens/About/PrivacyScreen';
import SupportScreen from './screens/About/SupportScreen';
import ThanksScreen from './screens/About/ThanksScreen';
import CategoryDetail from './screens/CategoryDetail';
import CategoryList from './screens/CategoryList';
import LoginForm from './screens/Login/LoginForm';
import SignUpForm from './screens/Login/SignUpForm';
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
      About: {
        initialRouteName: 'AboutScreen',
        screens: {
          AboutScreen: '/about',
          SupportScreen: '/about/support',
          PrivacyScreen: '/about/privacy',
          ThanksScreen: '/about/say-thanks',
        },
      },
      'Sign in': {
        screens: {
          SignInScreen: '/signin',
        },
      },
      'Sign up': {
        screens: {
          SignUpScreen: '/signup',
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
      header: props => <CustomNavigationBar {...props} />,
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
      header: props => <CustomNavigationBar {...props} />,
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
      header: props => <CustomNavigationBar {...props} />,
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
      header: props => <CustomNavigationBar {...props} />,
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
      header: props => <CustomNavigationBar {...props} />,
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
      header: props => <CustomNavigationBar {...props} />,
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

const SignInStack = createNativeStackNavigator();
const SignIn = () => (
  <SignInStack.Navigator
    screenOptions={{
      header: props => <CustomNavigationBar {...props} />,
    }}
  >
    <SignInStack.Screen
      name="SignInScreen"
      component={LoginForm}
      options={{title: 'Sign in'}}
    />
  </SignInStack.Navigator>
);

const SignUpStack = createNativeStackNavigator();
const SignUp = () => (
  <SignUpStack.Navigator
    screenOptions={{
      header: props => <CustomNavigationBar {...props} />,
    }}
  >
    <SignUpStack.Screen
      name="SignUpScreen"
      component={SignUpForm}
      options={{title: 'Sign up'}}
    />
  </SignUpStack.Navigator>
);

const AboutStack = createNativeStackNavigator();
const About = () => (
  <AboutStack.Navigator
    screenOptions={{
      header: props => <CustomNavigationBar {...props} />,
    }}
  >
    <AboutStack.Screen
      name="AboutScreen"
      component={AboutScreen}
      options={{title: 'About'}}
    />
    <AboutStack.Screen
      name="SupportScreen"
      component={SupportScreen}
      options={{title: 'Support'}}
    />
    <AboutStack.Screen
      name="PrivacyScreen"
      component={PrivacyScreen}
      options={{title: 'Privacy Policy'}}
    />
    <AboutStack.Screen
      name="ThanksScreen"
      component={ThanksScreen}
      options={{title: 'Ways to Say Thanks'}}
    />
  </AboutStack.Navigator>
);

const drawerTypeForBreakpoint = breakpoint =>
  breakpoint === large ? 'permanent' : 'back';

const MAX_CHANGES_PER_INTERVAL = 50; // half of Safari limit of 100
const INTERVAL_LENGTH_IN_SECONDS = 60; // twice Safari limit of 30

const resetCountAfterInterval = throttle(changeCount => {
  console.log('resetting history API limit');
  changeCount.current = 0;
}, INTERVAL_LENGTH_IN_SECONDS * 1000);

// Calling useBreakpoint() in the parent causes too many rerenders due
// to useWindowDimensions(). So we wrap it in a child component, so the
// child can rerender without the parent doing so.
function BreakpointDetector({onChange}) {
  const changeCount = useRef(0);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (changeCount.current < MAX_CHANGES_PER_INTERVAL) {
      changeCount.current += 1;
      onChange(breakpoint);
      resetCountAfterInterval(changeCount);
    } else {
      console.log(
        'prevented navigation rerender until history API limit refreshes',
      );
    }
  }, [breakpoint, onChange]);

  return null;
}

export default function Navigation() {
  const {isLoggedIn} = useToken();
  const [drawerType, setDrawerType] = useState(
    drawerTypeForBreakpoint('medium'),
  );

  function handleChangeBreakpoint(breakpoint) {
    // delay to allow navigation.closeDrawer() in NavigationBar to complete first
    setTimeout(() => {
      console.log('breakpoint changed to ', breakpoint);
      setDrawerType(drawerTypeForBreakpoint(breakpoint));
    }, 500);
  }

  // IMPORTANT: NavigationContainer must not rerender too often because
  // it calls the history API, and Safari and Firefox place limits on
  // the frequency of history API calls. (Safari: 100 times in 30
  // seconds).
  return (
    <>
      <BreakpointDetector onChange={handleChangeBreakpoint} />
      <NavigationContainer linking={linking}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerType,
            drawerStyle: {width: 200},
          }}
          drawerContent={props => <CustomNavigationDrawer {...props} />}
        >
          {isLoggedIn ? (
            <>
              <Drawer.Screen name="Available" component={Available} />
              <Drawer.Screen name="Tomorrow" component={Tomorrow} />
              <Drawer.Screen name="Future" component={Future} />
              <Drawer.Screen name="Completed" component={Completed} />
              <Drawer.Screen name="Deleted" component={Deleted} />
              <Drawer.Screen name="Categories" component={Categories} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Sign in" component={SignIn} />
              <Drawer.Screen name="Sign up" component={SignUp} />
            </>
          )}
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
