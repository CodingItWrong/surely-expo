"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _TextInputMask = _interopRequireDefault(require("../TextInputMask"));

var _reactNativePaper = require("react-native-paper");

var _reactNative = require("react-native");

var _DatePickerModal = _interopRequireDefault(require("./DatePickerModal"));

var _inputUtils = _interopRequireDefault(require("./inputUtils"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DatePickerInput(_ref, ref) {
  let {
    label,
    value,
    onChange,
    style,
    locale,
    validRange,
    inputMode,
    withModal = true,
    withDateFormatInLabel = true,
    ...rest
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    formattedValue,
    inputFormat,
    onChangeText,
    error
  } = (0, _inputUtils.default)({
    locale,
    value,
    validRange,
    inputMode,
    onChange
  });
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChangeRef = (0, _utils.useLatest)(onChange);
  const onInnerConfirm = React.useCallback(_ref2 => {
    let {
      date
    } = _ref2;
    setVisible(false);
    onChangeRef.current(date);
  }, [setVisible, onChangeRef]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_TextInputMask.default, _extends({}, rest, {
    ref: ref,
    label: getLabel({
      label,
      inputFormat,
      withDateFormatInLabel
    }),
    value: formattedValue,
    keyboardType: 'number-pad',
    placeholder: inputFormat,
    mask: inputFormat,
    onChangeText: onChangeText,
    keyboardAppearance: theme.dark ? 'dark' : 'default',
    error: !!error,
    style: [styles.input, style]
  })), withModal ? /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    size: 24,
    style: styles.calendarButton,
    icon: "calendar",
    onPress: () => setVisible(true) // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }) : null), /*#__PURE__*/React.createElement(_reactNativePaper.HelperText, {
    type: "error",
    visible: !!error
  }, error), withModal ? /*#__PURE__*/React.createElement(_DatePickerModal.default, {
    date: value,
    mode: "single",
    visible: visible,
    onDismiss: onDismiss,
    onConfirm: onInnerConfirm,
    locale: locale,
    dateMode: inputMode
  }) : null);
}

function getLabel(_ref3) {
  let {
    withDateFormatInLabel,
    inputFormat,
    label
  } = _ref3;

  if (withDateFormatInLabel) {
    return label ? `${label} (${inputFormat})` : inputFormat;
  }

  return label || '';
}

const styles = _reactNative.StyleSheet.create({
  root: {
    minWidth: 150,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    flexGrow: 1,
    alignSelf: 'flex-start'
  },
  input: {
    flexGrow: 1
  },
  calendarButton: {
    position: 'absolute',
    right: 0
  }
});

var _default = /*#__PURE__*/React.forwardRef(DatePickerInput);

exports.default = _default;
//# sourceMappingURL=DatePickerInput.js.map