import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useToken} from '../data/token';

export default function TokenLoadBuffer({children}) {
  const {isTokenLoaded} = useToken();

  // see https://docs.expo.dev/versions/latest/sdk/splash-screen/
  const onLayoutRootView = useCallback(() => {
    if (isTokenLoaded) {
      return SplashScreen.hideAsync();
    }
  }, [isTokenLoaded]);

  if (!isTokenLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null; // because children will error
  } else {
    return (
      <View style={styles.fill} onLayout={onLayoutRootView}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
