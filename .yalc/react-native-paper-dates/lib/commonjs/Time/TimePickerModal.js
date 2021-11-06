"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePickerModal = TimePickerModal;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

var _timeUtils = require("./timeUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

function TimePickerModal(_ref) {
  let {
    visible,
    onDismiss,
    onConfirm,
    hours,
    minutes,
    label = 'Select time',
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    locale
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const [inputType, setInputType] = React.useState(_timeUtils.inputTypes.picker);
  const [focused, setFocused] = React.useState(_timeUtils.clockTypes.hours);
  const [localHours, setLocalHours] = React.useState(getHours(hours));
  const [localMinutes, setLocalMinutes] = React.useState(getMinutes(minutes));
  React.useEffect(() => {
    setLocalHours(getHours(hours));
  }, [setLocalHours, hours]);
  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes));
  }, [setLocalMinutes, minutes]);
  const onFocusInput = React.useCallback(type => setFocused(type), []);
  const onChange = React.useCallback(params => {
    if (params.focused) {
      setFocused(params.focused);
    }

    setLocalHours(params.hours);
    setLocalMinutes(params.minutes);
  }, [setFocused, setLocalHours, setLocalMinutes]);
  return /*#__PURE__*/React.createElement(_reactNative.Modal, {
    animationType: animationType,
    transparent: true,
    visible: visible,
    onRequestClose: onDismiss,
    presentationStyle: "overFullScreen",
    supportedOrientations: supportedOrientations //@ts-ignore
    ,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onDismiss
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: theme.colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.KeyboardAvoidingView, {
    style: styles.keyboardView,
    behavior: 'padding'
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.modalContent, {
      backgroundColor: theme.dark ? (0, _reactNativePaper.overlay)(10, theme.colors.surface) : theme.colors.surface,
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.labelContainer
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.label, {
      color: theme.colors.text
    }]
  }, label.toUpperCase())), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.timePickerContainer
  }, /*#__PURE__*/React.createElement(_TimePicker.default, {
    locale: locale,
    inputType: inputType,
    focused: focused,
    hours: localHours,
    minutes: localMinutes,
    onChange: onChange,
    onFocusInput: onFocusInput
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.bottom
  }, /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    icon: _timeUtils.inputTypeIcons[_timeUtils.reverseInputTypes[inputType]],
    onPress: () => setInputType(_timeUtils.reverseInputTypes[inputType]),
    size: 24,
    style: styles.inputTypeToggle,
    accessibilityLabel: "toggle keyboard" // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.fill
  }), /*#__PURE__*/React.createElement(_reactNativePaper.Button, {
    onPress: onDismiss
  }, cancelLabel), /*#__PURE__*/React.createElement(_reactNativePaper.Button, {
    onPress: () => onConfirm({
      hours: localHours,
      minutes: localMinutes
    })
  }, confirmLabel)))))));
}

function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}

function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}

const styles = _reactNative.StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  keyboardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalBackground: {
    flex: 1
  },
  modalContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    minWidth: 287
  },
  labelContainer: {
    height: 28,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24
  },
  label: {
    letterSpacing: 1,
    fontSize: 13
  },
  timePickerContainer: {
    padding: 24
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  inputTypeToggle: {
    margin: 4
  },
  fill: {
    flex: 1
  }
});

var _default = /*#__PURE__*/React.memo(TimePickerModal);

exports.default = _default;
//# sourceMappingURL=TimePickerModal.js.map