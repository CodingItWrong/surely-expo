import {useLinkTo} from '@react-navigation/native';
import React, {useState} from 'react';
import {Appbar, Menu} from 'react-native-paper';

export default function CustomNavigationBar({
  route,
  navigation,
  options,
  back,
  logOut,
}) {
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
      <Appbar.Content title={options.title} />
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
          onPress={() => linkTo('/todos/tomorrow')}
          title="Tomorrow"
          icon="weather-night"
        />
        <Menu.Item
          onPress={() => linkTo('/todos/future')}
          title="Future"
          icon="calendar-blank"
        />
        <Menu.Item
          onPress={() => linkTo('/todos/completed')}
          title="Completed"
          icon="checkbox-marked"
        />
        <Menu.Item
          onPress={() => linkTo('/todos/deleted')}
          title="Deleted"
          icon="delete"
        />
        <Menu.Item onPress={logOut} title="Sign out" />
      </Menu>
    </Appbar.Header>
  );
}
