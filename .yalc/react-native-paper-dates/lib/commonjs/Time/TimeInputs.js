"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _timeUtils = require("./timeUtils");

var _TimeInput = _interopRequireDefault(require("./TimeInput"));

var _AmPmSwitcher = _interopRequireDefault(require("./AmPmSwitcher"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @typescript-eslint/no-unused-vars
// WORK IN PROGRESS
function TimeInputs(_ref) {
  let {
    hours,
    minutes,
    onFocusInput,
    focused,
    inputType,
    onChange,
    is24Hour
  } = _ref;
  const startInput = React.useRef(null);
  const endInput = React.useRef(null);
  const dimensions = (0, _reactNative.useWindowDimensions)();
  const isLandscape = dimensions.width > dimensions.height;
  const theme = (0, _reactNativePaper.useTheme)();
  const onSubmitStartInput = React.useCallback(() => {
    if (endInput.current) {
      endInput.current.focus();
    }
  }, [endInput]);
  const onSubmitEndInput = React.useCallback(() => {// TODO: close modal and persist time
  }, []);
  const minutesRef = (0, _utils.useLatest)(minutes);
  const onChangeHours = React.useCallback(newHours => {
    onChange({
      hours: newHours,
      minutes: minutesRef.current,
      focused: _timeUtils.clockTypes.hours
    });
  }, [onChange, minutesRef]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.inputContainer, isLandscape && styles.inputContainerLandscape]
  }, /*#__PURE__*/React.createElement(_TimeInput.default, {
    ref: startInput,
    placeholder: '00',
    value: (0, _timeUtils.toHourInputFormat)(hours, is24Hour),
    clockType: _timeUtils.clockTypes.hours,
    pressed: focused === _timeUtils.clockTypes.hours,
    onPress: onFocusInput,
    inputType: inputType,
    returnKeyType: 'next',
    onSubmitEditing: onSubmitStartInput,
    blurOnSubmit: false,
    onChanged: newHoursFromInput => {
      let newHours = (0, _timeUtils.toHourOutputFormat)(newHoursFromInput, hours, is24Hour);

      if (newHoursFromInput > 24) {
        newHours = 24;
      }

      onChange({
        hours: newHours,
        minutes
      });
    } // onChangeText={onChangeStartInput}

  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.hoursAndMinutesSeparator
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.spaceDot
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.dot, {
      backgroundColor: theme.colors.text
    }]
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.betweenDot
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.dot, {
      backgroundColor: theme.colors.text
    }]
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.spaceDot
  })), /*#__PURE__*/React.createElement(_TimeInput.default, {
    ref: endInput,
    placeholder: '00',
    value: minutes,
    clockType: _timeUtils.clockTypes.minutes,
    pressed: focused === _timeUtils.clockTypes.minutes,
    onPress: onFocusInput,
    inputType: inputType,
    onSubmitEditing: onSubmitEndInput,
    onChanged: newMinutesFromInput => {
      let newMinutes = newMinutesFromInput;

      if (newMinutesFromInput > 60) {
        newMinutes = 60;
      }

      onChange({
        hours,
        minutes: newMinutes
      });
    }
  }), !is24Hour && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.spaceBetweenInputsAndSwitcher
  }), /*#__PURE__*/React.createElement(_AmPmSwitcher.default, {
    hours: hours,
    onChange: onChangeHours
  })));
}

const styles = _reactNative.StyleSheet.create({
  spaceBetweenInputsAndSwitcher: {
    width: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainerLandscape: {
    flex: 1
  },
  hoursAndMinutesSeparator: {
    fontSize: 65,
    width: 24,
    alignItems: 'center'
  },
  spaceDot: {
    flex: 1
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2
  },
  betweenDot: {
    height: 12
  }
});

var _default = /*#__PURE__*/React.memo(TimeInputs);

exports.default = _default;
//# sourceMappingURL=TimeInputs.js.map