"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AnimatedClockSwitcher;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _timeUtils = require("./timeUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AnimatedClockSwitcher(_ref) {
  let {
    focused,
    hours,
    minutes
  } = _ref;
  const collapsed = focused === _timeUtils.clockTypes.hours;
  const animatedCollapsed = React.useRef(new _reactNative.Animated.Value(collapsed ? 1 : 0));
  React.useEffect(() => {
    _reactNative.Animated.timing(animatedCollapsed.current, {
      toValue: collapsed ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start();
  }, [collapsed]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: collapsed ? 'auto' : 'none',
    style: [_reactNative.StyleSheet.absoluteFill, {
      opacity: animatedCollapsed.current,
      transform: [{
        scale: animatedCollapsed.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1]
        })
      }]
    }]
  }, hours), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: collapsed ? 'none' : 'auto',
    style: [_reactNative.StyleSheet.absoluteFill, {
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