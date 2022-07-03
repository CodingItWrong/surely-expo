import {StyleSheet, View} from 'react-native';
import {useToken} from '../data/token';

export default function TokenLoadBuffer({children}) {
  const {isTokenLoaded} = useToken();
  if (!isTokenLoaded) {
    return null;
  } else {
    return <View style={styles.fill}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
