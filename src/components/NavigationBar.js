import {useLinkTo} from '@react-navigation/native';
import React, {useState} from 'react';
import {Appbar, Menu} from 'react-native-paper';

export default function CustomNavigationBar({route, navigation, back, logOut}) {
  const linkTo = useLinkTo();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          accessibilityLabel={`Back to ${back.title}`}
        />
      ) : null}
      <Appbar.Content title={route.name} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="menu"
              color="black"
              accessibilityLabel="Menu"
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => linkTo('/')}
            title="Available"
            icon="clock-outline"
          />
          <Menu.Item
            onPress={() => linkTo('/todos/future')}
            title="Future"
            icon="calendar-blank"
          />
          <Menu.Item onPress={logOut} title="Sign out" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
