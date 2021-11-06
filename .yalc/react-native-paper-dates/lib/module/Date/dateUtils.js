import * as React from 'react';
import { useLatest } from '../utils';
export function showWeekDay(dayIndex, disableWeekDays) {
  return !(disableWeekDays && disableWeekDays.some(di => di === dayIndex));
}
export function dateToUnix(d) {
  return Math.round(d.getTime() / 1000);
}
export function addMonths(date, count) {
  let n = date.getDate();
  let n2 = new Date(date.getTime());
  n2.setDate(1);
  n2.setMonth(n2.getMonth() + count);
  n2.setDate(Math.min(n, getDaysInMonth({
    year: n2.getFullYear(),
    month: n2.getMonth()
  })));
  return n2;
} // https://stackoverflow.com/a/1185068/2508481
// pass in any date as parameter anyDateInMonth based on dayjs

export function getDaysInMonth(_ref) {
  let {
    year,
    month
  } = _ref;
  return [31, isLeapYear({
    year
  }) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
export function getFirstDayOfMonth(_ref2) {
  let {
    year,
    month
  } = _ref2;
  return new Date(year, month, 1).getDay();
}
export function useRangeChecker(validRange) {
  const validStart = validRange === null || validRange === void 0 ? void 0 : validRange.startDate;
  const validEnd = validRange === null || validRange === void 0 ? void 0 : validRange.endDate;
  const startUnix = validStart instanceof Date ? dateToUnix(getStartOfDay(validStart)) : undefined;
  const endUnix = validEnd instanceof Date ? dateToUnix(getEndOfDay(validEnd)) : undefined;
  const validDisabledDatesRef = useLatest(validRange === null || validRange === void 0 ? void 0 : validRange.disabledDates);
  const isWithinValidRange = React.useCallback(day => {
    return isDateWithinOptionalRange(day, {
      startUnix: startUnix,
      endUnix: endUnix
    });
  }, [startUnix, endUnix]);
  const isDisabled = React.useCallback(day => {
    return validDisabledDatesRef.current ? validDisabledDatesRef.current.some(disabledDate => areDatesOnSameDay(disabledDate, day)) : false;
  }, [validDisabledDatesRef]);
  return {
    isDisabled,
    isWithinValidRange,
    validStart,
    validEnd
  };
}
export function areDatesOnSameDay(a, b) {
  if (!b) {
    return false;
  }

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
export function isDateBetween(date, _ref3) {
  let {
    startDate,
    endDate
  } = _ref3;

  if (!startDate || !endDate) {
    return false;
  }

  return date <= endDate && date >= startDate;
}
/**
 * Check if a date is within an optional range.
 *
 * If the range doesn't exist, it defaults to `true`.
 */

export function isDateWithinOptionalRange(date, _ref4) {
  let {
    startUnix,
    endUnix
  } = _ref4;
  const dateUnix = dateToUnix(date); // if startUnix is provided and date is before start

  if (startUnix && dateUnix < startUnix) {
    return false;
  } // if endUnix is provided and date is after end


  if (endUnix && dateUnix > endUnix) {
    return false;
  }

  return true;
}
export function isLeapYear(_ref5) {
  let {
    year
  } = _ref5;
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
export const daySize = 46;
export const estimatedMonthHeight = 360;
export const startAtIndex = 1200;
export const totalMonths = startAtIndex * 2;
export const beginOffset = estimatedMonthHeight * startAtIndex;
export const gridCounts = new Array(totalMonths);
export function getGridCount(index) {
  const cHeight = gridCounts[index];

  if (cHeight) {
    return cHeight;
  }

  const monthDate = addMonths(new Date(), getRealIndex(index));
  const h = getGridCountForDate(monthDate);
  gridCounts[index] = h;
  return h;
}
export function getGridCountForDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth({
    year,
    month
  });
  const dayOfWeek = getFirstDayOfMonth({
    year,
    month
  });
  return Math.ceil((daysInMonth + dayOfWeek) / 7);
}
export function getRealIndex(index) {
  return index - startAtIndex;
}
export function getInitialIndex(date) {
  if (!date) {
    return startAtIndex;
  }

  const today = new Date();
  const months = differenceInMonths(today, date);
  return startAtIndex + months;
}
export function useInputFormatter(_ref6) {
  let {
    locale
  } = _ref6;
  return React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }, [locale]);
}
export function getStartOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
}
export function getEndOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
}
export function useInputFormat(_ref7) {
  let {
    formatter
  } = _ref7;
  return React.useMemo(() => {
    // TODO: something cleaner and more universal?
    const inputDate = formatter.format(new Date(2020, 10 - 1, 1));
    return inputDate.replace('2020', 'YYYY').replace('10', 'MM').replace('01', 'DD');
  }, [formatter]);
}
export function differenceInMonths(firstDate, secondDate) {
  let diffMonths = (secondDate.getFullYear() - firstDate.getFullYear()) * 12;
  diffMonths -= firstDate.getMonth();
  diffMonths += secondDate.getMonth();
  return diffMonths;
}
//# sourceMappingURL=dateUtils.js.map