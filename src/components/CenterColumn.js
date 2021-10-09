import {StyleSheet, View} from 'react-native';

export default function CenterColumn({children}) {
  return (
    <View style={styles.columnWrapper}>
      <View style={styles.column}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    maxWidth: 600,
  },
});
