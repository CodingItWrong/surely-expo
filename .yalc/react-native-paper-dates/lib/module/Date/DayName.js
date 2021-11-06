import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

function DayName(_ref) {
  let {
    label
  } = _ref;
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.dayName
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.dayNameLabel, theme.fonts.medium],
    selectable: false
  }, label));
}

const styles = StyleSheet.create({
  dayName: {
    flex: 1,
    alignItems: 'center'
  },
  dayNameLabel: {
    fontSize: 14,
    opacity: 0.7
  }
});
export default /*#__PURE__*/React.memo(DayName);
//# sourceMappingURL=DayName.js.map