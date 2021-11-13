import {Dimensions} from 'react-native';
import {Appbar} from 'react-native-paper';
import {breakpointLarge} from '../breakpoints';

export default function CustomNavigationBar({navigation, options, back}) {
  const {width} = Dimensions.get('window');
  const showDrawerToggle = width < breakpointLarge;
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction
          testID="back-button"
          onPress={navigation.goBack}
          accessibilityLabel="Back"
        />
      ) : null}
      <Appbar.Content title={options.title} />
      {showDrawerToggle && (
        <Appbar.Action
          testID="toggle-navigation-button"
          accessibilityLabel="Menu"
          icon="menu"
          onPress={navigation.toggleDrawer}
        />
      )}
    </Appbar.Header>
  );
}
