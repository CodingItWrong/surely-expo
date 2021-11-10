"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCalendarHeaderHeight = getCalendarHeaderHeight;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _DayNames = _interopRequireWildcard(require("./DayNames"));

var _utils = require("../translations/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

function getCalendarHeaderHeight(scrollMode) {
  if (scrollMode === 'horizontal') {
    return buttonContainerHeight + buttonContainerMarginTop + buttonContainerMarginBottom + _DayNames.dayNamesHeight;
  }

  return _DayNames.dayNamesHeight;
}

function CalendarHeader(_ref) {
  let {
    scrollMode,
    onPrev,
    onNext,
    disableWeekDays,
    locale
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const isHorizontal = scrollMode === 'horizontal';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.datePickerHeader,
    pointerEvents: 'box-none'
  }, isHorizontal ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.buttonContainer,
    pointerEvents: 'box-none'
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.spacer,
    pointerEvents: 'box-none'
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.buttonWrapper, {
      backgroundColor: theme.colors.surface
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    icon: "chevron-left",
    accessibilityLabel: (0, _utils.getTranslation)(locale, 'previous'),
    onPress: onPrev // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.buttonWrapper, {
      backgroundColor: theme.colors.surface
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    icon: "chevron-right",
    accessibilityLabel: (0, _utils.getTranslation)(locale, 'next'),
    onPress: onNext // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }))) : null, /*#__PURE__*/React.createElement(_DayNames.default, {
    disableWeekDays: disableWeekDays,
    locale: locale
  }));
}

const styles = _reactNative.StyleSheet.create({
  datePickerHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10
  },
  buttonContainer: {
    height: buttonContainerHeight,
    marginTop: buttonContainerMarginTop,
    marginBottom: buttonContainerMarginBottom,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonWrapper: {},
  spacer: {
    flex: 1
  }
});

var _default = /*#__PURE__*/React.memo(CalendarHeader);

exports.default = _default;
//# sourceMappingURL=CalendarHeader.js.map