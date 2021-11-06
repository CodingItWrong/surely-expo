import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from './Swiper';
import Month from './Month';
import { areDatesOnSameDay, dateToUnix, getEndOfDay, getInitialIndex } from './dateUtils';
import CalendarHeader from './CalendarHeader';
import { useCallback, useMemo } from 'react';
import YearPicker from './YearPicker';
import Color from 'color';
import { useTheme } from 'react-native-paper';
import { useLatest, lightenBy, darkenBy } from '../utils';

function Calendar(props) {
  const {
    locale,
    mode,
    onChange,
    startDate,
    endDate,
    date,
    disableWeekDays,
    dates,
    validRange,
    dateMode
  } = props;
  const theme = useTheme();
  const selectColor = useMemo(() => {
    if (theme.dark) {
      return darkenBy(Color(theme.colors.primary), 0.9).hex();
    }

    return lightenBy(Color(theme.colors.primary), 0.9).hex();
  }, [theme]);
  const scrollMode = mode === 'range' || mode === 'multiple' ? 'vertical' : 'horizontal';
  const [selectedYear, setSelectedYear] = React.useState(undefined);
  const [selectingYear, setSelectingYear] = React.useState(false);
  const onPressYear = useCallback(year => {
    setSelectedYear(year);
    setSelectingYear(prev => !prev);
  }, [setSelectingYear]); // prevent re-rendering all months when something changed we only need the
  // latest version of the props and we don't want the useCallback to change

  const startDateRef = useLatest(startDate);
  const endDateRef = useLatest(endDate);
  const onChangeRef = useLatest(onChange);
  const datesRef = useLatest(dates);
  const onPressDate = useCallback(d => {
    if (mode === 'single') {
      ;
      onChangeRef.current({
        date: dateMode === 'start' ? d : getEndOfDay(d)
      });
    } else if (mode === 'range') {
      const sd = startDateRef.current;
      const ed = endDateRef.current;
      let isStart = true;

      if (sd && !ed && dateToUnix(d) > dateToUnix(sd)) {
        isStart = false;
      }

      ;
      onChangeRef.current({
        startDate: isStart ? d : sd,
        endDate: !isStart ? getEndOfDay(d) : undefined
      });
    } else if (mode === 'multiple') {
      datesRef.current = datesRef.current || [];
      const exists = datesRef.current.some(ed => areDatesOnSameDay(ed, d));
      const newDates = exists ? datesRef.current.filter(ed => !areDatesOnSameDay(ed, d)) : [...datesRef.current, d];
      newDates.sort((a, b) => a.getTime() - b.getTime());
      onChangeRef.current({
        dates: newDates,
        datePressed: d,
        change: exists ? 'removed' : 'added'
      });
    }
  }, [mode, dateMode, onChangeRef, startDateRef, endDateRef, datesRef]);
  const firstDate = startDate || date || (dates === null || dates === void 0 ? void 0 : dates[0]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Swiper, {
    initialIndex: getInitialIndex(firstDate),
    selectedYear: selectedYear,
    scrollMode: scrollMode,
    renderItem: _ref => {
      let {
        index
      } = _ref;
      return /*#__PURE__*/React.createElement(Month, {
        locale: locale,
        mode: mode,
        key: index,
        validRange: validRange,
        index: index,
        startDate: startDate,
        endDate: endDate,
        date: date,
        dates: dates,
        onPressYear: onPressYear,
        selectingYear: selectingYear,
        onPressDate: onPressDate,
        scrollMode: scrollMode,
        primaryColor: theme.colors.primary,
        selectColor: selectColor,
        roundness: theme.roundness,
        disableWeekDays: disableWeekDays
      });
    },
    renderHeader: _ref2 => {
      let {
        onPrev,
        onNext
      } = _ref2;
      return /*#__PURE__*/React.createElement(CalendarHeader, {
        locale: locale,
        onPrev: onPrev,
        onNext: onNext,
        scrollMode: scrollMode,
        disableWeekDays: disableWeekDays
      });
    }
  }), scrollMode === 'horizontal' ? /*#__PURE__*/React.createElement(YearPicker, {
    selectedYear: selectedYear,
    selectingYear: selectingYear,
    onPressYear: onPressYear
  }) : null);
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  viewPager: {
    flex: 1
  }
});
export default /*#__PURE__*/React.memo(Calendar);
//# sourceMappingURL=Calendar.js.map