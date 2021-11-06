import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
export default function AnimatedCrossView(_ref) {
  let {
    // visible,
    collapsed,
    calendar,
    calendarEdit
  } = _ref;
  const theme = useTheme();
  const calendarOpacity = React.useRef(new Animated.Value(collapsed ? 1 : 0));
  React.useEffect(() => {
    // if (visible) {
    Animated.timing(calendarOpacity.current, {
      toValue: collapsed ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start(); // }
  }, [collapsed]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: collapsed ? 'auto' : 'none',
    style: [styles.calendar, {
      opacity: calendarOpacity.current,
      transform: [{
        scaleY: calendarOpacity.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0.85, 1]
        })
      }, {
        scaleX: calendarOpacity.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1]
        })
      }]
    }]
  }, calendar), /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: collapsed ? 'none' : 'auto',
    style: [styles.calendarEdit, {
      backgroundColor: theme.colors.surface,
      opacity: calendarOpacity.current.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      transform: [{
        scale: calendarOpacity.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.95]
        })
      }]
    }]
  }, calendarEdit));
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  calendarEdit: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  calendar: {
    flex: 1
  }
});
//# sourceMappingURL=AnimatedCrossView.js.map