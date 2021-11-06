"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _dateUtils = require("./dateUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function DayRange(_ref) {
  let {
    leftCrop,
    rightCrop,
    inRange,
    selectColor
  } = _ref;
  const bothWays = inRange && leftCrop && rightCrop;
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

  if (inRange || isCrop) {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      pointerEvents: "none",
      style: [_reactNative.StyleSheet.absoluteFill, styles.rangeRoot, bothWays && styles.rangeRootBoth, inRange && !isCrop ? {
        backgroundColor: selectColor
      } : null]
    }, isCrop && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.flex1, rightCrop ? {
        backgroundColor: selectColor
      } : null]
    }), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [{
        backgroundColor: selectColor,
        minWidth: _dateUtils.daySize,
        minHeight: _dateUtils.daySize
      }, leftCrop ? styles.leftRadius : null, rightCrop ? styles.rightRadius : null]
    }), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.flex1, leftCrop ? {
        backgroundColor: selectColor
      } : null]
    })));
  }

  return null;
}

const styles = _reactNative.StyleSheet.create({
  leftRadius: {
    borderBottomLeftRadius: _dateUtils.daySize / 2,
    borderTopLeftRadius: _dateUtils.daySize / 2
  },
  rightRadius: {
    borderBottomRightRadius: _dateUtils.daySize / 2,
    borderTopRightRadius: _dateUtils.daySize / 2
  },
  rangeRootBoth: {
    borderRadius: _dateUtils.daySize / 2
  },
  flex1: {
    flex: 1
  },
  rangeRoot: {
    flexDirection: 'row'
  }
});

var _default = /*#__PURE__*/React.memo(DayRange);

exports.default = _default;
//# sourceMappingURL=DayRange.js.map