function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useHeaderTextColor } from '../utils';
import Color from 'color';
import { getTranslation } from '../translations/utils';

function getLabel(locale, mode, configuredLabel) {
  if (configuredLabel) {
    return configuredLabel;
  }

  if (mode === 'range') {
    return getTranslation(locale, 'selectRange');
  }

  if (mode === 'multiple') {
    return getTranslation(locale, 'selectMultiple');
  }

  if (mode === 'single') {
    return getTranslation(locale, 'selectSingle');
  }

  return '...?';
}

export default function DatePickerModalContentHeader(props) {
  const {
    onToggle,
    collapsed,
    mode,
    moreLabel
  } = props;
  const label = getLabel(props.locale, props.mode, props.label);
  const color = useHeaderTextColor();
  const allowEditing = mode !== 'multiple';
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.header]
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, {
      color
    }]
  }, label.toUpperCase()), /*#__PURE__*/React.createElement(View, {
    style: styles.headerContentContainer
  }, mode === 'range' ? /*#__PURE__*/React.createElement(HeaderContentRange, _extends({}, props, {
    color: color
  })) : null, mode === 'single' ? /*#__PURE__*/React.createElement(HeaderContentSingle, _extends({}, props, {
    color: color
  })) : null, mode === 'multiple' ? /*#__PURE__*/React.createElement(HeaderContentMulti, _extends({}, props, {
    color: color,
    moreLabel: moreLabel
  })) : null)), /*#__PURE__*/React.createElement(View, {
    style: styles.fill
  }), allowEditing ? /*#__PURE__*/React.createElement(IconButton, {
    icon: collapsed ? 'pencil' : 'calendar',
    accessibilityLabel: collapsed ? 'Type in date' : 'Pick date from calendar',
    color: color,
    onPress: onToggle // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }) : null);
}
export function HeaderContentSingle(_ref) {
  let {
    state,
    emptyLabel = ' ',
    color,
    locale
  } = _ref;
  const lighterColor = Color(color).fade(0.5).rgb().toString();
  const dateColor = state.date ? color : lighterColor;
  const formatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric'
    });
  }, [locale]);
  return /*#__PURE__*/React.createElement(Text, {
    style: [styles.singleHeaderText, {
      color: dateColor
    }]
  }, state.date ? formatter.format(state.date) : emptyLabel);
}
export function HeaderContentMulti(_ref2) {
  var _state$dates;

  let {
    state,
    emptyLabel = ' ',
    moreLabel = 'more',
    color,
    locale
  } = _ref2;
  const dateCount = ((_state$dates = state.dates) === null || _state$dates === void 0 ? void 0 : _state$dates.length) || 0;
  const lighterColor = Color(color).fade(0.5).rgb().toString();
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

  return /*#__PURE__*/React.createElement(Text, {
    style: [styles.singleHeaderText, {
      color: dateColor
    }]
  }, label);
}
export function HeaderContentRange(_ref3) {
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
  const lighterColor = Color(color).fade(0.5).rgb().toString();
  const startColor = state.startDate ? color : lighterColor;
  const endColor = state.endDate ? color : lighterColor;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.rangeHeaderText, {
      color: startColor
    }]
  }, state.startDate ? formatter.format(state.startDate) : startLabel), /*#__PURE__*/React.createElement(Text, {
    style: [styles.headerSeparator, {
      color
    }]
  }, headerSeparator), /*#__PURE__*/React.createElement(Text, {
    style: [styles.rangeHeaderText, {
      color: endColor
    }]
  }, state.endDate ? formatter.format(state.endDate) : endLabel));
}
const styles = StyleSheet.create({
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