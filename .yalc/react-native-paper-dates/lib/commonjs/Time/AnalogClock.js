"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _color = _interopRequireDefault(require("color"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _timeUtils = require("./timeUtils");

var React = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _AnalogClockHours = _interopRequireDefault(require("./AnalogClockHours"));

var _AnimatedClockSwitcher = _interopRequireDefault(require("./AnimatedClockSwitcher"));

var _AnalogClockMinutes = _interopRequireDefault(require("./AnalogClockMinutes"));

var _TimePicker = require("./TimePicker");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnalogClock(_ref) {
  let {
    hours,
    minutes,
    focused,
    is24Hour,
    onChange
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const {
    mode
  } = React.useContext(_TimePicker.DisplayModeContext); // used to make pointer shorter if hours are selected and above 12

  const shortPointer = (hours === 0 || hours > 12) && is24Hour;
  const clockRef = React.useRef(null); // Hooks are nice, sometimes... :-)..
  // We need the latest values, since the onPointerMove uses a closure to the function

  const hoursRef = (0, _utils.useLatest)(hours);
  const onChangeRef = (0, _utils.useLatest)(onChange);
  const minutesRef = (0, _utils.useLatest)(minutes);
  const focusedRef = (0, _utils.useLatest)(focused);
  const is24HourRef = (0, _utils.useLatest)(is24Hour);
  const modeRef = (0, _utils.useLatest)(mode);
  const onPointerMove = React.useCallback((e, final) => {
    let x = e.nativeEvent.locationX;
    let y = e.nativeEvent.locationY;
    let angle = (0, _timeUtils.getAngle)(x, y, _timeUtils.circleSize);

    if (focusedRef.current === _timeUtils.clockTypes.hours) {
      let hours24 = is24HourRef.current;
      let previousHourType = (0, _timeUtils.getHourType)(hoursRef.current);
      let pickedHours = (0, _timeUtils.getHours)(angle, previousHourType);
      let hours12AndPm = !hours24 && modeRef.current === 'PM'; // Avoiding the "24h"
      // Should be 12h for 12 hours and PM mode

      if ((hours12AndPm || hours24) && pickedHours + 12 < 24) {
        pickedHours += 12;
      }

      if (pickedHours === 24) {
        pickedHours = 0;
      }

      if (hoursRef.current !== pickedHours || final) {
        onChangeRef.current({
          hours: pickedHours,
          minutes: minutesRef.current,
          focused: final ? _timeUtils.clockTypes.minutes : undefined
        });
      }
    } else if (focusedRef.current === _timeUtils.clockTypes.minutes) {
      let pickedMinutes = (0, _timeUtils.getMinutes)(angle);

      if (minutesRef.current !== pickedMinutes) {
        onChangeRef.current({
          hours: hoursRef.current,
          minutes: pickedMinutes
        });
      }
    }
  }, [focusedRef, is24HourRef, hoursRef, onChangeRef, minutesRef, modeRef]);
  const panResponder = React.useRef(_reactNative.PanResponder.create({
    onPanResponderGrant: e => onPointerMove(e, false),
    onPanResponderMove: e => onPointerMove(e, false),
    onPanResponderRelease: e => onPointerMove(e, true),
    onStartShouldSetPanResponder: returnTrue,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: returnTrue,
    onMoveShouldSetPanResponderCapture: returnTrue,
    onPanResponderTerminationRequest: returnTrue,
    onShouldBlockNativeResponder: returnTrue
  })).current;
  const dynamicSize = focused === _timeUtils.clockTypes.hours && shortPointer ? 33 : 0;
  const pointerNumber = focused === _timeUtils.clockTypes.hours ? hours : minutes;
  const degreesPerNumber = focused === _timeUtils.clockTypes.hours ? 30 : 6;
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    ref: clockRef
  }, panResponder.panHandlers, {
    style: [styles.clock, {
      backgroundColor: theme.dark ? (0, _color.default)(theme.colors.surface).lighten(1.2).hex() : (0, _color.default)(theme.colors.surface).darken(0.1).hex()
    }] // @ts-ignore -> https://github.com/necolas/react-native-web/issues/506
    ,
    cursor: 'pointer'
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.line, {
      backgroundColor: theme.colors.primary,
      transform: [{
        rotate: -90 + pointerNumber * degreesPerNumber + 'deg'
      }, {
        translateX: _timeUtils.circleSize / 4 - 4 - dynamicSize / 2
      }],
      width: _timeUtils.circleSize / 2 - 4 - dynamicSize
    }],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.endPoint, {
      backgroundColor: theme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.center],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.middlePoint, {
      backgroundColor: theme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(_AnimatedClockSwitcher.default, {
    focused: focused,
    hours: /*#__PURE__*/React.createElement(_AnalogClockHours.default, {
      is24Hour: is24Hour,
      hours: hours
    }),
    minutes: /*#__PURE__*/React.createElement(_AnalogClockMinutes.default, {
      minutes: minutes
    })
  }));
}

const styles = _reactNative.StyleSheet.create({
  clock: {
    height: _timeUtils.circleSize,
    width: _timeUtils.circleSize,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: _timeUtils.circleSize / 2
  },
  middlePoint: {
    borderRadius: 4,
    height: 8,
    width: 8
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  endPoint: {
    borderRadius: 15,
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
    bottom: -14
  },
  line: {
    position: 'absolute',
    marginBottom: -1,
    height: 2,
    borderRadius: 4
  }
});

function returnTrue() {
  return true;
}

var _default = /*#__PURE__*/React.memo(AnalogClock);

exports.default = _default;
//# sourceMappingURL=AnalogClock.js.map