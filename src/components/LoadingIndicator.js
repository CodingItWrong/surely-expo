import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

/* istanbul ignore next */
export default function LoadingIndicator() {
  return (
    <ActivityIndicator
      size="large"
      accessibilityLabel="Loading"
      style={styles.loadingIndicator}
    />
  );
}

/* istanbul ignore next */
const styles = StyleSheet.create({
  loadingIndicator: {
    margin: 10,
  },
});
