import * as React from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import DayRange from './DayRange';
import { daySize } from './dateUtils';

function EmptyDayPure() {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.empty
  });
}

export const EmptyDay = /*#__PURE__*/React.memo(EmptyDayPure);

function Day(props) {
  const {
    day,
    month,
    year,
    selected,
    inRange,
    leftCrop,
    rightCrop,
    onPressDate,
    primaryColor,
    selectColor,
    isToday,
    disabled,
    textColorOnPrimary,
    theme
  } = props; // console.log(month, { day })

  const onPress = React.useCallback(() => {
    onPressDate(new Date(year, month, day));
  }, [onPressDate, year, month, day]);
  const borderColor = selected || inRange && theme.dark ? textColorOnPrimary : theme.dark ? '#fff' : '#000';
  const textColor = selected || inRange && theme.dark ? textColorOnPrimary : undefined;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.root, disabled && styles.disabled]
  }, /*#__PURE__*/React.createElement(DayRange, {
    inRange: inRange,
    leftCrop: leftCrop,
    rightCrop: rightCrop,
    selectColor: selectColor
  }), /*#__PURE__*/React.createElement(TouchableRipple, {
    testID: `react-native-paper-dates-day-${year}-${month}-${day}`,
    disabled: disabled,
    borderless: true,
    onPress: disabled ? undefined : onPress,
    style: [styles.button, {
      backgroundColor: inRange ? selectColor : undefined
    }],
    accessibilityRole: "button" // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.day, isToday ? {
      borderColor: borderColor
    } : null, selected ? {
      backgroundColor: primaryColor
    } : null]
  }, /*#__PURE__*/React.createElement(Text, {
    style: textColor ? {
      color: textColor
    } : undefined,
    selectable: false
  }, day))));
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    flexBasis: 0
  },
  disabled: {
    opacity: 0.3
  },
  root: {
    flexBasis: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  button: {
    width: daySize,
    height: daySize,
    overflow: 'hidden',
    borderRadius: daySize / 2
  },
  day: {
    flexBasis: 0,
    flex: 1,
    borderRadius: daySize / 2,
    width: daySize,
    height: daySize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  flex1: {
    flex: 1
  }
});
export default /*#__PURE__*/React.memo(Day);
//# sourceMappingURL=Day.js.map