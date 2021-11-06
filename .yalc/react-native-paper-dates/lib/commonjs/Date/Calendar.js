"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Swiper = _interopRequireDefault(require("./Swiper"));

var _Month = _interopRequireDefault(require("./Month"));

var _dateUtils = require("./dateUtils");

var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));

var _YearPicker = _interopRequireDefault(require("./YearPicker"));

var _color = _interopRequireDefault(require("color"));

var _reactNativePaper = require("react-native-paper");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const theme = (0, _reactNativePaper.useTheme)();
  const selectColor = (0, React.useMemo)(() => {
    if (theme.dark) {
      return (0, _utils.darkenBy)((0, _color.default)(theme.colors.primary), 0.9).hex();
    }

    return (0, _utils.lightenBy)((0, _color.default)(theme.colors.primary), 0.9).hex();
  }, [theme]);
  const scrollMode = mode === 'range' || mode === 'multiple' ? 'vertical' : 'horizontal';
  const [selectedYear, setSelectedYear] = React.useState(undefined);
  const [selectingYear, setSelectingYear] = React.useState(false);
  const onPressYear = (0, React.useCallback)(year => {
    setSelectedYear(year);
    setSelectingYear(prev => !prev);
  }, [setSelectingYear]); // prevent re-rendering all months when something changed we only need the
  // latest version of the props and we don't want the useCallback to change

  const startDateRef = (0, _utils.useLatest)(startDate);
  const endDateRef = (0, _utils.useLatest)(endDate);
  const onChangeRef = (0, _utils.useLatest)(onChange);
  const datesRef = (0, _utils.useLatest)(dates);
  const onPressDate = (0, React.useCallback)(d => {
    if (mode === 'single') {
      ;
      onChangeRef.current({
        date: dateMode === 'start' ? d : (0, _dateUtils.getEndOfDay)(d)
      });
    } else if (mode === 'range') {
      const sd = startDateRef.current;
      const ed = endDateRef.current;
      let isStart = true;

      if (sd && !ed && (0, _dateUtils.dateToUnix)(d) > (0, _dateUtils.dateToUnix)(sd)) {
        isStart = false;
      }

      ;
      onChangeRef.current({
        startDate: isStart ? d : sd,
        endDate: !isStart ? (0, _dateUtils.getEndOfDay)(d) : undefined
      });
    } else if (mode === 'multiple') {
      datesRef.current = datesRef.current || [];
      const exists = datesRef.current.some(ed => (0, _dateUtils.areDatesOnSameDay)(ed, d));
      const newDates = exists ? datesRef.current.filter(ed => !(0, _dateUtils.areDatesOnSameDay)(ed, d)) : [...datesRef.current, d];
      newDates.sort((a, b) => a.getTime() - b.getTime());
      onChangeRef.current({
        dates: newDates,
        datePressed: d,
        change: exists ? 'removed' : 'added'
      });
    }
  }, [mode, dateMode, onChangeRef, startDateRef, endDateRef, datesRef]);
  const firstDate = startDate || date || (dates === null || dates === void 0 ? void 0 : dates[0]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_Swiper.default, {
    initialIndex: (0, _dateUtils.getInitialIndex)(firstDate),
    selectedYear: selectedYear,
    scrollMode: scrollMode,
    renderItem: _ref => {
      let {
        index
      } = _ref;
      return /*#__PURE__*/React.createElement(_Month.default, {
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
      return /*#__PURE__*/React.createElement(_CalendarHeader.default, {
        locale: locale,
        onPrev: onPrev,
        onNext: onNext,
        scrollMode: scrollMode,
        disableWeekDays: disableWeekDays
      });
    }
  }), scrollMode === 'horizontal' ? /*#__PURE__*/React.createElement(_YearPicker.default, {
    selectedYear: selectedYear,
    selectingYear: selectingYear,
    onPressYear: onPressYear
  }) : null);
}

const styles = _reactNative.StyleSheet.create({
  root: {
    flex: 1
  },
  viewPager: {
    flex: 1
  }
});

var _default = /*#__PURE__*/React.memo(Calendar);

exports.default = _default;
//# sourceMappingURL=Calendar.js.map