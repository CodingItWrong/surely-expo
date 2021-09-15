import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {List} from 'react-native-paper';

export default function CustomNavigationDrawer({logOut, ...navProps}) {
  const {state, navigation} = navProps;

  const isSelected = index => index === state.index;

  return (
    <DrawerContentScrollView {...navProps}>
      {state.routes.map((route, index) => (
        <List.Item
          key={route.key}
          title={route.name}
          onPress={() => navigation.navigate(route.name)}
          style={{
            backgroundColor: isSelected(index) ? '#4caf50' : null,
          }}
        />
      ))}
      <List.Item title="Sign out" onPress={logOut} />
    </DrawerContentScrollView>
  );
}
