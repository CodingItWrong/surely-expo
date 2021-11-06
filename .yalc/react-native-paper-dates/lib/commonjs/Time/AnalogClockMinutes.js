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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AnalogClockMinutes(_ref) {
  let {
    minutes
  } = _ref;
  const range = getMinuteNumbers(_timeUtils.circleSize, 12);
  const color = (0, _utils.useTextColorOnPrimary)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, range.map((a, i) => {
    const currentMinutes = i * 5;
    const isZero = currentMinutes === 0;
    let isCurrent = currentMinutes - 1 <= minutes && currentMinutes + 1 >= minutes;

    if (isZero) {
      isCurrent = minutes >= 59 || currentMinutes + 1 >= minutes;
    }

    return /*#__PURE__*/React.createElement(_reactNative.View, {
      key: i,
      pointerEvents: "none",
      style: [styles.outerHourRoot, {
        top: a[1] || 0,
        left: a[0] || 0
      }]
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: styles.outerHourInner
    }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
      style: isCurrent ? {
        color
      } : undefined,
      selectable: false
    }, isZero ? '00' : currentMinutes)));
  }));
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
  },
  textWhite: {
    color: '#fff'
  }
});

function getMinuteNumbers(size, count) {
  let angle = 0;
  let step = 2 * Math.PI / count;
  let radius = size / 2.5;
  angle = angle = -90 * Math.PI / 180;
  return Array(12).fill(true).map(() => {
    let x = Math.round(size / 2 + radius * Math.cos(angle));
    let y = Math.round(size / 2 + radius * Math.sin(angle));
    angle += step;
    return [x, y];
  });
}

var _default = /*#__PURE__*/React.memo(AnalogClockMinutes);

exports.default = _default;
//# sourceMappingURL=AnalogClockMinutes.js.map