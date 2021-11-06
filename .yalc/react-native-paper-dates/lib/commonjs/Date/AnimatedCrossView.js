"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AnimatedCrossView;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AnimatedCrossView(_ref) {
  let {
    // visible,
    collapsed,
    calendar,
    calendarEdit
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const calendarOpacity = React.useRef(new _reactNative.Animated.Value(collapsed ? 1 : 0));
  React.useEffect(() => {
    // if (visible) {
    _reactNative.Animated.timing(calendarOpacity.current, {
      toValue: collapsed ? 1 : 0,
      duration: 250,
      useNativeDriver: true
    }).start(); // }

  }, [collapsed]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
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
  }, calendar), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
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

const styles = _reactNative.StyleSheet.create({
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