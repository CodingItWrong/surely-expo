import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function LoadingIndicator() {
  return (
    <ActivityIndicator
      size="large"
      accessibilityLabel="Loading"
      style={styles.loadingIndicator}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    margin: 10,
  },
});
