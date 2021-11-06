"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AmPmSwitcher;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _color = _interopRequireDefault(require("color"));

var _timeUtils = require("./timeUtils");

var _TimePicker = require("./TimePicker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AmPmSwitcher(_ref) {
  let {
    onChange,
    hours
  } = _ref;
  const {
    setMode,
    mode
  } = React.useContext(_TimePicker.DisplayModeContext);
  const theme = (0, _reactNativePaper.useTheme)();
  const backgroundColor = (0, React.useMemo)(() => {
    if (theme.dark) {
      return (0, _color.default)(theme.colors.surface).lighten(1.2).hex();
    }

    return (0, _color.default)(theme.colors.surface).darken(0.1).hex();
  }, [theme]);
  const isAM = mode === 'AM';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.root, {
      borderColor: backgroundColor,
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(SwitchButton, {
    label: "AM",
    onPress: () => {
      setMode('AM');

      if (hours - 12 >= 0) {
        onChange(hours - 12);
      }
    },
    selected: isAM,
    disabled: isAM
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchSeparator, {
      backgroundColor
    }]
  }), /*#__PURE__*/React.createElement(SwitchButton, {
    label: "PM",
    onPress: () => {
      setMode('PM');

      if (hours + 12 <= 24) {
        onChange(hours + 12);
      }
    },
    selected: !isAM,
    disabled: !isAM
  }));
}

function SwitchButton(_ref2) {
  let {
    label,
    onPress,
    selected,
    disabled
  } = _ref2;
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    backgroundColor,
    color
  } = (0, _timeUtils.useSwitchColors)(selected);
  return /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    onPress: onPress,
    style: styles.switchButton,
    accessibilityLabel: label // @ts-ignore old React Native versions
    ,
    accessibilityTraits: disabled ? ['button', 'disabled'] : 'button' // @ts-ignore old React Native versions
    ,
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      disabled
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.switchButtonInner, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    selectable: false,
    style: [{ ...theme.fonts.medium,
      color: color
    }]
  }, label)));
}

const styles = _reactNative.StyleSheet.create({
  root: {
    width: 50,
    height: 80,
    borderWidth: 1,
    overflow: 'hidden'
  },
  switchSeparator: {
    height: 1,
    width: 48
  },
  switchButton: {
    flex: 1
  },
  switchButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=AmPmSwitcher.js.map