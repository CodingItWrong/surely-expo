import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { clockTypes } from './timeUtils';
export default function AnimatedClockSwitcher(_ref) {
  let {
    focused,
    hours,
    minutes
  } = _ref;
  const collapsed = focused === clockTypes.hours;
  const animatedCollapsed = React.useRef(new Animated.Value(collapsed ? 1 : 0));
  React.useEffect(() => {
    Animated.timing(animatedCollapsed.current, {
      toValue: collapsed ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [collapsed]);
  return /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: collapsed ? 'auto' : 'none',
    style: [StyleSheet.absoluteFill, {
      opacity: animatedCollapsed.current,
      transform: [{
        scale: animatedCollapsed.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1]
        })
      }]
    }]
  }, hours), /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: collapsed ? 'none' : 'auto',
    style: [StyleSheet.absoluteFill, {
      opacity: animatedCollapsed.current.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      transform: [{
        scale: animatedCollapsed.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.95]
        })
      }]
    }]
  }, minutes));
}
//# sourceMappingURL=AnimatedClockSwitcher.js.map