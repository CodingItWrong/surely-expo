import {StyleSheet, View} from 'react-native';

export default function VerticalButtonGroup({children}) {
  return (
    <View style={styles.buttonGroupRow}>
      <View style={styles.buttonGroup}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonGroup: {
    marginVertical: 10,
  },
});
