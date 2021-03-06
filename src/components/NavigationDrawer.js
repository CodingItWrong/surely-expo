import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Platform, StyleSheet, View} from 'react-native';
import {Drawer, withTheme} from 'react-native-paper';
import {useToken} from '../data/token';
import DownloadOnTheAppStoreButton from './DownloadOnTheAppStoreButton';

const IS_WEB = Platform.OS === 'web';

function CustomNavigationDrawer({theme, iconByRoute, ...navProps}) {
  const {state, navigation} = navProps;
  const {isLoggedIn, clearToken} = useToken();

  const isSelected = index => index === state.index;

  const scrollViewStyle = {
    backgroundColor: theme.colors.background,
  };

  async function signOut() {
    await clearToken();
    navigation.navigate('Sign in');
  }

  return (
    <DrawerContentScrollView style={scrollViewStyle} {...navProps}>
      {state.routes.map((route, index) => (
        <Drawer.Item
          testID={`${route.name.toLowerCase()}-nav-button`}
          key={route.key}
          label={route.name}
          accessibilityLabel={route.name}
          icon={iconByRoute[route.name]}
          active={isSelected(index)}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
      {isLoggedIn && (
        <Drawer.Item
          testID="sign-out-button"
          label="Sign out"
          onPress={signOut}
        />
      )}
      {IS_WEB && (
        <View style={styles.appStoreButtonContainer}>
          <DownloadOnTheAppStoreButton />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

export default withTheme(CustomNavigationDrawer);

const styles = StyleSheet.create({
  appStoreButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});
