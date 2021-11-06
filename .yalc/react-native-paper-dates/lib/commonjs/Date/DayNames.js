"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.dayNamesHeight = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _DayName = _interopRequireDefault(require("./DayName"));

var _reactNativePaper = require("react-native-paper");

var _dateUtils = require("./dateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const dayNamesHeight = 44; // TODO: wait for a better Intl api ;-)

exports.dayNamesHeight = dayNamesHeight;
const weekdays = [new Date(2020, 7, 2), new Date(2020, 7, 3), new Date(2020, 7, 4), new Date(2020, 7, 5), new Date(2020, 7, 6), new Date(2020, 7, 7), new Date(2020, 7, 8)];

function DayNames(_ref) {
  let {
    disableWeekDays,
    locale
  } = _ref;
  const theme = (0, _reactNativePaper.useTheme)();
  const shortDayNames = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: 'narrow'
    });
    return weekdays.map(date => formatter.format(date));
  }, [locale]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.dayNames, {
      backgroundColor: theme.colors.surface
    }],
    pointerEvents: 'none'
  }, shortDayNames.filter((_, dayIndex) => (0, _dateUtils.showWeekDay)(dayIndex, disableWeekDays)).map((dayName, i) => /*#__PURE__*/React.createElement(_DayName.default, {
    key: `${dayName}_${i}`,
    label: dayName
  })));
}

const styles = _reactNative.StyleSheet.create({
  dayNames: {
    height: dayNamesHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

var _default = /*#__PURE__*/React.memo(DayNames);

exports.default = _default;
//# sourceMappingURL=DayNames.js.map