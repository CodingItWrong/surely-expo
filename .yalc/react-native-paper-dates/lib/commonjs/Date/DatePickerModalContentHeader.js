"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderContentMulti = HeaderContentMulti;
exports.HeaderContentRange = HeaderContentRange;
exports.HeaderContentSingle = HeaderContentSingle;
exports.default = DatePickerModalContentHeader;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _utils = require("../utils");

var _color = _interopRequireDefault(require("color"));

var _utils2 = require("../translations/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getLabel(locale, mode, configuredLabel) {
  if (configuredLabel) {
    return configuredLabel;
  }

  if (mode === 'range') {
    return (0, _utils2.getTranslation)(locale, 'selectRange');
  }

  if (mode === 'multiple') {
    return (0, _utils2.getTranslation)(locale, 'selectMultiple');
  }

  if (mode === 'single') {
    return (0, _utils2.getTranslation)(locale, 'selectSingle');
  }

  return '...?';
}

function DatePickerModalContentHeader(props) {
  const {
    onToggle,
    collapsed,
    mode,
    moreLabel
  } = props;
  const label = getLabel(props.locale, props.mode, props.label);
  const color = (0, _utils.useHeaderTextColor)();
  const allowEditing = mode !== 'multiple';
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.header]
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.label, {
      color
    }]
  }, label.toUpperCase()), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.headerContentContainer
  }, mode === 'range' ? /*#__PURE__*/React.createElement(HeaderContentRange, _extends({}, props, {
    color: color
  })) : null, mode === 'single' ? /*#__PURE__*/React.createElement(HeaderContentSingle, _extends({}, props, {
    color: color
  })) : null, mode === 'multiple' ? /*#__PURE__*/React.createElement(HeaderContentMulti, _extends({}, props, {
    color: color,
    moreLabel: moreLabel
  })) : null)), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.fill
  }), allowEditing ? /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    icon: collapsed ? 'pencil' : 'calendar',
    accessibilityLabel: collapsed ? 'Type in date' : 'Pick date from calendar',
    color: color,
    onPress: onToggle // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }) : null);
}

function HeaderContentSingle(_ref) {
  let {
    state,
    emptyLabel = ' ',
    color,
    locale
  } = _ref;
  const lighterColor = (0, _color.default)(color).fade(0.5).rgb().toString();
  const dateColor = state.date ? color : lighterColor;
  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric'
    });
  }, [locale]);
  return /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.singleHeaderText, {
      color: dateColor
    }]
  }, state.date ? formatter.format(state.date) : emptyLabel);
}

function HeaderContentMulti(_ref2) {
  var _state$dates;

  let {
    state,
    emptyLabel = ' ',
    moreLabel = 'more',
    color,
    locale
  } = _ref2;
  const dateCount = ((_state$dates = state.dates) === null || _state$dates === void 0 ? void 0 : _state$dates.length) || 0;
  const lighterColor = (0, _color.default)(color).fade(0.5).rgb().toString();
  const dateColor = dateCount ? color : lighterColor;
  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric'
    });
  }, [locale]);
  let label = emptyLabel;

  if (dateCount) {
    if (dateCount <= 2) {
      label = state.dates.map(date => formatter.format(date)).join(', ');
    } else {
      label = formatter.format(state.dates[0]) + ` (+ ${dateCount - 1} ${moreLabel})`;
    }
  }

  return /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.singleHeaderText, {
      color: dateColor
    }]
  }, label);
}

function HeaderContentRange(_ref3) {
  let {
    locale,
    state,
    headerSeparator = '-',
    startLabel = 'Start',
    endLabel = 'End',
    color
  } = _ref3;
  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric'
    });
  }, [locale]);
  const lighterColor = (0, _color.default)(color).fade(0.5).rgb().toString();
  const startColor = state.startDate ? color : lighterColor;
  const endColor = state.endDate ? color : lighterColor;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.rangeHeaderText, {
      color: startColor
    }]
  }, state.startDate ? formatter.format(state.startDate) : startLabel), /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.headerSeparator, {
      color
    }]
  }, headerSeparator), /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.rangeHeaderText, {
      color: endColor
    }]
  }, state.endDate ? formatter.format(state.endDate) : endLabel));
}

const styles = _reactNative.StyleSheet.create({
  fill: {
    flex: 1
  },
  animated: {
    paddingBottom: 0,
    elevation: 4
  },
  safeContent: {
    paddingBottom: 0
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12
  },
  headerContentContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  label: {
    color: '#fff',
    letterSpacing: 1,
    fontSize: 13
  },
  singleHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  rangeHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  excludeInRangeHeaderText: {
    fontSize: 25
  },
  excludeInRangeHeaderTextSmall: {
    fontSize: 14,
    marginTop: -3,
    marginLeft: 3
  },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6
  },
  appbarHeader: {
    elevation: 0
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  }
});
//# sourceMappingURL=DatePickerModalContentHeader.js.map