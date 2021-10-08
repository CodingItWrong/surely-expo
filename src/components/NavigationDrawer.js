import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, withTheme} from 'react-native-paper';

const ICON_FOR_ROUTE = {
  Available: 'clock-outline',
  Tomorrow: 'weather-night',
  Future: 'calendar-blank',
  Completed: 'checkbox-marked',
  Deleted: 'delete',
  Categories: 'tag',
};

function CustomNavigationDrawer({theme, logOut, ...navProps}) {
  const {state, navigation} = navProps;

  const isSelected = index => index === state.index;

  const scrollViewStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <DrawerContentScrollView style={scrollViewStyle} {...navProps}>
      {state.routes.map((route, index) => (
        <Drawer.Item
          testID={`${route.name.toLowerCase()}-nav-button`}
          key={route.key}
          label={route.name}
          icon={ICON_FOR_ROUTE[route.name]}
          active={isSelected(index)}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
      <Drawer.Item testID="sign-out-button" label="Sign out" onPress={logOut} />
    </DrawerContentScrollView>
  );
}

export default withTheme(CustomNavigationDrawer);
