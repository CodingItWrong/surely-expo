import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import * as React from 'react';
import { useHeaderBackgroundColor } from '../utils';
export default function DatePickerModalHeaderBackground(_ref) {
  let {
    children
  } = _ref;
  const backgroundColor = useHeaderBackgroundColor();
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.animated, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.safeContent
  }, children));
}
const styles = StyleSheet.create({
  animated: {
    paddingBottom: 0,
    elevation: 4
  },
  safeContent: {
    paddingBottom: 0
  }
});
//# sourceMappingURL=DatePickerModalHeaderBackground.js.map