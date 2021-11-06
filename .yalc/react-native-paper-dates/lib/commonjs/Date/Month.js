"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getHorizontalMonthOffset = getHorizontalMonthOffset;
exports.getIndexFromHorizontalOffset = getIndexFromHorizontalOffset;
exports.getIndexFromVerticalOffset = getIndexFromVerticalOffset;
exports.getMonthHeight = getMonthHeight;
exports.getVerticalMonthsOffset = getVerticalMonthsOffset;
exports.weekSize = exports.weekMargin = exports.monthHeaderSingleMarginTop = exports.monthHeaderSingleMarginBottom = exports.monthHeaderSingleHeight = exports.montHeaderHeight = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _Day = _interopRequireWildcard(require("./Day"));

var _dateUtils = require("./dateUtils");

var _CalendarHeader = require("./CalendarHeader");

var _DayNames = require("./DayNames");

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Month(props) {
  const {
    index,
    mode,
    date,
    dates,
    startDate,
    endDate,
    onPressYear,
    selectingYear,
    onPressDate,
    scrollMode,
    primaryColor,
    selectColor,
    roundness,
    disableWeekDays,
    locale,
    validRange
  } = props;
  const theme = (0, _reactNativePaper.useTheme)();
  const textColorOnPrimary = (0, _utils.useTextColorOnPrimary)();
  const realIndex = (0, _dateUtils.getRealIndex)(index);
  const isHorizontal = scrollMode === 'horizontal';
  const {
    isDisabled,
    isWithinValidRange
  } = (0, _dateUtils.useRangeChecker)(validRange);
  const {
    monthName,
    month,
    year
  } = React.useMemo(() => {
    const md = (0, _dateUtils.addMonths)(new Date(), realIndex);
    const y = md.getFullYear();
    const m = md.getMonth();
    const formatter = new Intl.DateTimeFormat(locale, {
      month: 'long'
    });
    return {
      monthName: formatter.format(md),
      month: m,
      year: y
    };
  }, [realIndex, locale]);
  const grid = React.useMemo(() => {
    const today = new Date();
    const daysInMonth = (0, _dateUtils.getDaysInMonth)({
      year,
      month
    });
    const dayOfWeek = (0, _dateUtils.getFirstDayOfMonth)({
      year,
      month
    });
    const emptyDays = dayOfWeek;
    return monthGrid(index).map(_ref => {
      let {
        days,
        weekGrid
      } = _ref;
      return {
        weekIndex: weekGrid,
        generatedDays: days.map((_, dayIndex) => {
          const isFirstWeek = weekGrid === 0;
          const realDayIndex = emptyDays - dayIndex;
          const beforeWeekDay = isFirstWeek && realDayIndex > 0;
          const dayOfMonth = weekGrid * 7 + dayIndex - emptyDays + 1;
          const afterWeekDay = dayOfMonth > daysInMonth;
          const day = new Date(year, month, dayOfMonth);
          const isToday = (0, _dateUtils.areDatesOnSameDay)(day, today);
          let inRange = false;
          let disabled = isDisabled(day);
          let selected = false;
          let leftCrop = dayOfMonth === 1;
          let rightCrop = dayOfMonth === daysInMonth;
          const isFirstDayOfMonth = dayOfMonth === 1;
          const isLastDayOfMonth = dayOfMonth === daysInMonth;

          if (mode === 'range') {
            const selectedStartDay = (0, _dateUtils.areDatesOnSameDay)(day, startDate);
            const selectedEndDay = (0, _dateUtils.areDatesOnSameDay)(day, endDate);
            selected = selectedStartDay || selectedEndDay;
            inRange = (0, _dateUtils.isDateBetween)(day, {
              startDate,
              endDate
            });

            if (selectedStartDay) {
              leftCrop = true;
            }

            if (selectedEndDay) {
              rightCrop = true;
            }

            if (dayIndex === 0 && !selectedStartDay) {
              leftCrop = false;
            }

            if (dayIndex === 6 && !selectedEndDay) {
              rightCrop = false;
            }

            if (isFirstDayOfMonth && selectedEndDay || isLastDayOfMonth && selectedStartDay) {
              inRange = false;
            }
          } else if (mode === 'multiple') {
            const safeDates = dates || [];
            selected = safeDates.some(d => (0, _dateUtils.areDatesOnSameDay)(day, d));
            const yesterday = new Date(year, month, dayOfMonth - 1);
            const tomorrow = new Date(year, month, dayOfMonth + 1);
            const yesterdaySelected = safeDates.some(d => (0, _dateUtils.areDatesOnSameDay)(d, yesterday));
            const tomorrowSelected = safeDates.some(d => (0, _dateUtils.areDatesOnSameDay)(d, tomorrow));

            if (selected) {
              if (tomorrowSelected && yesterdaySelected) {
                inRange = true;
              }

              if (tomorrowSelected && !yesterdaySelected) {
                inRange = true;
                leftCrop = true;
              }

              if (yesterdaySelected && !tomorrowSelected) {
                inRange = true;
                rightCrop = true;
              }

              if (isFirstDayOfMonth && !tomorrowSelected) {
                inRange = false;
              }

              if (isLastDayOfMonth && !yesterdaySelected) {
                inRange = false;
              }

              if (inRange && !leftCrop && !rightCrop) {
                selected = false;
              }
            }
          } else if (mode === 'single') {
            selected = (0, _dateUtils.areDatesOnSameDay)(day, date);
          }

          const isWithinOptionalValidRange = isWithinValidRange(day);

          if (inRange && !disabled) {
            disabled = false;
          }

          if (!isWithinOptionalValidRange) {
            disabled = true;
          }

          return {
            beforeWeekDay,
            afterWeekDay,
            year,
            month,
            dayOfMonth,
            dayIndex,
            mode,
            selected,
            inRange,
            leftCrop,
            rightCrop,
            isToday,
            disabled
          };
        })
      };
    });
  }, [year, month, index, isDisabled, mode, isWithinValidRange, startDate, endDate, dates, date]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.month, {
      height: getMonthHeight(scrollMode, index)
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.monthHeader, isHorizontal ? {
      marginTop: monthHeaderSingleMarginTop,
      marginBottom: monthHeaderSingleMarginBottom
    } : null]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.TouchableRipple, {
    disabled: !isHorizontal,
    onPress: isHorizontal ? () => onPressYear(year) : undefined,
    accessibilityRole: "button",
    accessibilityLabel: `${monthName} ${year}`,
    style: [styles.yearButton, {
      borderRadius: roundness
    }] // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.yearButtonInner, {
      borderRadius: roundness
    }]
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: [styles.monthLabel, theme.fonts.medium],
    selectable: false
  }, monthName, " ", year), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: isHorizontal ? styles.opacity1 : styles.opacity0
  }, /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    onPress: isHorizontal ? () => onPressYear(year) : undefined,
    icon: selectingYear ? 'chevron-up' : 'chevron-down' // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }))))), grid.map(_ref2 => {
    let {
      weekIndex,
      generatedDays
    } = _ref2;
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: styles.week,
      key: weekIndex
    }, generatedDays.filter(gd => (0, _dateUtils.showWeekDay)(gd.dayIndex, disableWeekDays)).map(gd => gd.beforeWeekDay || gd.afterWeekDay ? /*#__PURE__*/React.createElement(_Day.EmptyDay, {
      key: gd.dayIndex
    }) : /*#__PURE__*/React.createElement(_Day.default, {
      key: gd.dayIndex,
      theme: theme,
      day: gd.dayOfMonth,
      month: gd.month,
      year: gd.year,
      selected: gd.selected,
      inRange: gd.inRange,
      leftCrop: gd.leftCrop,
      rightCrop: gd.rightCrop,
      onPressDate: onPressDate,
      isToday: gd.isToday,
      selectColor: selectColor,
      primaryColor: primaryColor,
      disabled: gd.disabled,
      textColorOnPrimary: textColorOnPrimary
    })));
  }));
}

const weekMargin = 6;
exports.weekMargin = weekMargin;
const weekSize = _dateUtils.daySize + weekMargin;
exports.weekSize = weekSize;
const montHeaderHeight = 56;
exports.montHeaderHeight = montHeaderHeight;
const monthHeaderSingleMarginTop = 4;
exports.monthHeaderSingleMarginTop = monthHeaderSingleMarginTop;
const monthHeaderSingleMarginBottom = 8 + 44 + 12;
exports.monthHeaderSingleMarginBottom = monthHeaderSingleMarginBottom;
const monthHeaderSingleHeight = monthHeaderSingleMarginTop + monthHeaderSingleMarginBottom;
exports.monthHeaderSingleHeight = monthHeaderSingleHeight;

const styles = _reactNative.StyleSheet.create({
  week: {
    flexDirection: 'row',
    marginBottom: weekMargin,
    height: _dateUtils.daySize
  },
  month: {},
  monthHeader: {
    height: montHeaderHeight,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  monthLabel: {
    fontSize: 14,
    opacity: 0.7
  },
  yearButton: {
    alignSelf: 'flex-start',
    marginLeft: 6
  },
  yearButtonInner: {
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  opacity0: {
    opacity: 0
  },
  opacity1: {
    opacity: 1
  }
});

const monthGrid = index => {
  return Array((0, _dateUtils.getGridCount)(index)).fill(null).map((_, weekGrid) => {
    const days = Array(7).fill(null);
    return {
      weekGrid,
      days
    };
  });
};

function getIndexCount(index) {
  if (index > _dateUtils.startAtIndex) {
    return index - _dateUtils.startAtIndex;
  }

  return -(_dateUtils.startAtIndex - index);
}

function weeksOffset(index) {
  if (index === _dateUtils.startAtIndex) {
    return 0;
  }

  let off = 0;

  if (index > _dateUtils.startAtIndex) {
    for (let i = 0; i < index - _dateUtils.startAtIndex; i++) {
      const cIndex = _dateUtils.startAtIndex + i;
      off += _dateUtils.gridCounts[cIndex] || (0, _dateUtils.getGridCount)(cIndex);
    }
  } else {
    for (let i = 0; i < _dateUtils.startAtIndex - index; i++) {
      const cIndex = _dateUtils.startAtIndex - i - 1;
      off -= _dateUtils.gridCounts[cIndex] || (0, _dateUtils.getGridCount)(cIndex);
    }
  }

  return off;
}

function getIndexFromHorizontalOffset(offset, width) {
  return _dateUtils.startAtIndex + Math.floor(offset / width);
}

function getIndexFromVerticalOffset(offset) {
  let estimatedIndex = _dateUtils.startAtIndex + Math.ceil(offset / _dateUtils.estimatedMonthHeight);
  const realOffset = getVerticalMonthsOffset(estimatedIndex);
  const difference = (realOffset - _dateUtils.beginOffset - offset) / _dateUtils.estimatedMonthHeight;

  if (difference >= 1 || difference <= -1) {
    estimatedIndex -= Math.floor(difference);
  }

  return estimatedIndex;
}

function getHorizontalMonthOffset(index, width) {
  if (index < 0) {
    return 0;
  }

  return width * index;
}

function getVerticalMonthsOffset(index) {
  const count = getIndexCount(index);
  const ob = weeksOffset(index);
  const monthsHeight = weekSize * ob;
  const c = monthsHeight + count * (_DayNames.dayNamesHeight + montHeaderHeight);
  return (c || 0) + _dateUtils.beginOffset;
}

function getMonthHeight(scrollMode, index) {
  const calendarHeight = (0, _CalendarHeader.getCalendarHeaderHeight)(scrollMode);
  const gc = (0, _dateUtils.getGridCount)(index);
  const currentMonthHeight = weekSize * gc;
  const extraHeight = scrollMode === 'horizontal' ? monthHeaderSingleHeight : montHeaderHeight;
  const c = calendarHeight + currentMonthHeight + extraHeight;
  return c || 0;
}

var _default = /*#__PURE__*/React.memo(Month);

exports.default = _default;
//# sourceMappingURL=Month.js.map