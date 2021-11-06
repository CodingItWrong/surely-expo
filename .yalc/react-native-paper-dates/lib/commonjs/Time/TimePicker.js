"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DisplayModeContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _timeUtils = require("./timeUtils");

var _AnalogClock = _interopRequireDefault(require("./AnalogClock"));

var _TimeInputs = _interopRequireDefault(require("./TimeInputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DisplayModeContext = /*#__PURE__*/React.createContext({
  mode: 'AM',
  setMode: () => {}
});
exports.DisplayModeContext = DisplayModeContext;

function TimePicker(_ref) {
  let {
    hours,
    minutes,
    onFocusInput,
    focused,
    inputType,
    onChange,
    locale
  } = _ref;
  const [displayMode, setDisplayMode] = React.useState(undefined);
  const dimensions = (0, _reactNative.useWindowDimensions)();
  const isLandscape = dimensions.width > dimensions.height; // method to check whether we have 24 hours in clock or 12

  const is24Hour = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
    const formatted = formatter.format(new Date(Date.UTC(2020, 1, 1, 23)));
    return formatted.includes('23');
  }, [locale]); // Initialize display Mode according the hours value

  React.useEffect(() => {
    if (hours >= 12) {
      setDisplayMode('PM');
    } else {
      setDisplayMode('AM');
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  const onInnerChange = React.useCallback(params => {
    params.hours = (0, _timeUtils.toHourOutputFormat)(params.hours, hours, is24Hour);
    onChange(params);
  }, [onChange, hours, is24Hour]);
  return /*#__PURE__*/React.createElement(DisplayModeContext.Provider, {
    value: {
      mode: displayMode,
      setMode: setDisplayMode
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: isLandscape ? styles.rootLandscape : styles.rootPortrait
  }, /*#__PURE__*/React.createElement(_TimeInputs.default, {
    inputType: inputType,
    hours: hours,
    minutes: minutes,
    is24Hour: is24Hour,
    onChange: onChange,
    onFocusInput: onFocusInput,
    focused: focused
  }), inputType === _timeUtils.inputTypes.picker ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.clockContainer
  }, /*#__PURE__*/React.createElement(_AnalogClock.default, {
    hours: (0, _timeUtils.toHourInputFormat)(hours, is24Hour),
    minutes: minutes,
    focused: focused,
    is24Hour: is24Hour,
    onChange: onInnerChange
  })) : null));
}

const styles = _reactNative.StyleSheet.create({
  rootLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24 * 3 + 96 * 2 + 52 + _timeUtils.circleSize
  },
  rootPortrait: {},
  clockContainer: {
    paddingTop: 36,
    paddingLeft: 12,
    paddingRight: 12
  }
});

var _default = /*#__PURE__*/React.memo(TimePicker);

exports.default = _default;
//# sourceMappingURL=TimePicker.js.map