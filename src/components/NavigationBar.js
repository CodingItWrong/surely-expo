import {Appbar, useTheme} from 'react-native-paper';
import {large, useBreakpoint} from '../breakpoints';
import {useColorScheme} from 'react-native';

const showDrawerToggleForBreakpoint = breakpoint => breakpoint !== large;

export default function NavigationBar({navigation, options, back}) {
  const breakpoint = useBreakpoint();
  const showDrawerToggle = showDrawerToggleForBreakpoint(breakpoint);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = useTheme();

  const lightHeaderStyle = {
    backgroundColor: theme.colors.primaryContainer,
  };
  const headerStyle = colorScheme === 'light' ? lightHeaderStyle : null;

  return (
    <Appbar.Header style={headerStyle}>
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
