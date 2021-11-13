import {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {large, useBreakpoint} from '../breakpoints';

const showDrawerToggleForBreakpoint = breakpoint => breakpoint !== large;

export default function CustomNavigationBar({navigation, options, back}) {
  const breakpoint = useBreakpoint();
  const [showDrawerToggle, setShowDrawerToggle] = useState(
    showDrawerToggleForBreakpoint(breakpoint),
  );

  useEffect(() => {
    setShowDrawerToggle(showDrawerToggleForBreakpoint(breakpoint));
    if (breakpoint === large) {
      // to avoid visual issues when drawerType === 'permanent'
      navigation.closeDrawer();
    }
  }, [breakpoint, navigation]);

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
