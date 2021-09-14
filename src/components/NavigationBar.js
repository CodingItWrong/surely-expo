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
      <Appbar.Action
        icon="menu"
        color="black"
        onPress={navigation.toggleDrawer}
      />
    </Appbar.Header>
  );
}
