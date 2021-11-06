"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _timeUtils = require("./timeUtils");

var _utils = require("../utils");

var _TimePicker = require("./TimePicker");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AnalogClockHours(_ref) {
  let {
    is24Hour,
    hours
  } = _ref;
  const {
    mode
  } = React.useContext(_TimePicker.DisplayModeContext);
  const outerRange = getHourNumbers(false, _timeUtils.circleSize, 12, 12);
  const innerRange = getHourNumbers(true, _timeUtils.circleSize, 12, 12);
  const color = (0, _utils.useTextColorOnPrimary)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, outerRange.map((a, i) => /*#__PURE__*/React.createElement(_reactNative.View, {
    key: i,
    pointerEvents: "none",
    style: [styles.outerHourRoot, {
      top: a[1] || 0,
      left: a[0] || 0
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.outerHourInner
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: hours === i + 1 ? {
      color
    } : null,
    selectable: false
  }, mode === 'AM' && i + 1 === 12 ? '00' : i + 1)))), is24Hour ? innerRange.map((a, i) => /*#__PURE__*/React.createElement(_reactNative.View, {
    key: i,
    pointerEvents: "none",
    style: [styles.innerHourRoot, {
      top: a[1] || 0,
      left: a[0] || 0
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.innerHourInner
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    selectable: false,
    style: [styles.innerHourText, i + 13 === hours || i + 13 === 24 && hours === 0 ? {
      color
    } : null]
  }, i + 13 === 24 ? '00' : i + 13)))) : null);
}

const styles = _reactNative.StyleSheet.create({
  outerHourRoot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    width: 50,
    height: 50,
    marginLeft: -25,
    marginTop: -25,
    borderRadius: 25
  },
  outerHourInner: {
    borderRadius: 25
  },
  innerHourRoot: {
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20
  },
  innerHourInner: {
    borderRadius: 20
  },
  innerHourText: {
    fontSize: 13
  }
});

function getHourNumbers(is24Hour, size, count, arrayLength) {
  let angle = 0;
  let step = 2 * Math.PI / count;
  let radius = size / (is24Hour ? 4 : 2.5);
  angle = -90 * Math.PI / 180 + Math.PI / 6;
  return Array(arrayLength).fill(true).map(() => {
    let x = Math.round(size / 2 + radius * Math.cos(angle));
    let y = Math.round(size / 2 + radius * Math.sin(angle));
    angle += step;
    return [x, y];
  });
}

var _default = /*#__PURE__*/React.memo(AnalogClockHours);

exports.default = _default;
//# sourceMappingURL=AnalogClockHours.js.map