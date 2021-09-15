import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useLinkTo} from '@react-navigation/native';
import React from 'react';
import {List} from 'react-native-paper';

export default function CustomNavigationDrawer(props) {
  const linkTo = useLinkTo();
  const {state, descriptors} = props;

  const isSelected = index => index === state.index;

  console.log({props});
  return (
    <DrawerContentScrollView {...props}>
      {state.routes.map((route, index) => (
        <List.Item
          key={route.key}
          title={route.name}
          onPress={() => linkTo(descriptors[route.key].options.link)}
          style={{
            backgroundColor: isSelected(index) ? '#4caf50' : null,
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}
