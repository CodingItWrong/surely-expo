import {Appbar} from 'react-native-paper';

export default function CustomNavigationBar({navigation, options, back}) {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction
          testID="back-button"
          onPress={navigation.goBack}
          accessibilityLabel={`Back to ${back.title}`}
        />
      ) : null}
      <Appbar.Content title={options.title} />
      <Appbar.Action
        testID="toggle-navigation-button"
        icon="menu"
        onPress={navigation.toggleDrawer}
      />
    </Appbar.Header>
  );
}
