import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {Drawer} from 'react-native-paper';

const ICON_FOR_ROUTE = {
  Available: 'clock-outline',
  Tomorrow: 'weather-night',
  Future: 'calendar-blank',
  Completed: 'checkbox-marked',
  Deleted: 'delete',
};

export default function CustomNavigationDrawer({logOut, ...navProps}) {
  const {state, navigation} = navProps;

  const isSelected = index => index === state.index;

  return (
    <DrawerContentScrollView {...navProps}>
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
      <Drawer.Item label="Sign out" onPress={logOut} />
    </DrawerContentScrollView>
  );
}
