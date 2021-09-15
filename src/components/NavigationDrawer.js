import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {List} from 'react-native-paper';

export default function CustomNavigationDrawer(props) {
  const {state, navigation} = props;

  const isSelected = index => index === state.index;

  console.log({props});
  return (
    <DrawerContentScrollView {...props}>
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
    </DrawerContentScrollView>
  );
}
