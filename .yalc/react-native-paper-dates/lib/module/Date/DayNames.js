import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DayName from './DayName';
import { useTheme } from 'react-native-paper';
import { showWeekDay } from './dateUtils';
export const dayNamesHeight = 44; // TODO: wait for a better Intl api ;-)

const weekdays = [new Date(2020, 7, 2), new Date(2020, 7, 3), new Date(2020, 7, 4), new Date(2020, 7, 5), new Date(2020, 7, 6), new Date(2020, 7, 7), new Date(2020, 7, 8)];

function DayNames(_ref) {
  let {
    disableWeekDays,
    locale
  } = _ref;
  const theme = useTheme();
  const shortDayNames = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: 'narrow'
    });
    return weekdays.map(date => formatter.format(date));
  }, [locale]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.dayNames, {
      backgroundColor: theme.colors.surface
    }],
    pointerEvents: 'none'
  }, shortDayNames.filter((_, dayIndex) => showWeekDay(dayIndex, disableWeekDays)).map((dayName, i) => /*#__PURE__*/React.createElement(DayName, {
    key: `${dayName}_${i}`,
    label: dayName
  })));
}

const styles = StyleSheet.create({
  dayNames: {
    height: dayNamesHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
export default /*#__PURE__*/React.memo(DayNames);
//# sourceMappingURL=DayNames.js.map