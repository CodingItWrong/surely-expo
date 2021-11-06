import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import DayNames, { dayNamesHeight } from './DayNames';
const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;
export function getCalendarHeaderHeight(scrollMode) {
  if (scrollMode === 'horizontal') {
    return buttonContainerHeight + buttonContainerMarginTop + buttonContainerMarginBottom + dayNamesHeight;
  }

  return dayNamesHeight;
}

function CalendarHeader(_ref) {
  let {
    scrollMode,
    onPrev,
    onNext,
    disableWeekDays,
    locale
  } = _ref;
  const theme = useTheme();
  const isHorizontal = scrollMode === 'horizontal';
  return /*#__PURE__*/React.createElement(View, {
    style: styles.datePickerHeader,
    pointerEvents: 'box-none'
  }, isHorizontal ? /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer,
    pointerEvents: 'box-none'
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.spacer,
    pointerEvents: 'box-none'
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.buttonWrapper, {
      backgroundColor: theme.colors.surface
    }]
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    accessibilityLabel: "Previous",
    onPress: onPrev // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  })), /*#__PURE__*/React.createElement(View, {
    style: [styles.buttonWrapper, {
      backgroundColor: theme.colors.surface
    }]
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    accessibilityLabel: "Next",
    onPress: onNext // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }))) : null, /*#__PURE__*/React.createElement(DayNames, {
    disableWeekDays: disableWeekDays,
    locale: locale
  }));
}

const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.memo(CalendarHeader);
//# sourceMappingURL=CalendarHeader.js.map