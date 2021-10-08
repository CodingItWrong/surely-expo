import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export default function NoTodosMessage({children}) {
  return <Text style={styles.message}>{children}</Text>;
}

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 18,
  },
});
