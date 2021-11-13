import {ActivityIndicator} from '@codingitwrong/react-native-paper';
import {StyleSheet} from 'react-native';

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
