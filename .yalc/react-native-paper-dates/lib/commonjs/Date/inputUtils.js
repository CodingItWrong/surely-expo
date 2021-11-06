"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDateInput;

var _dateUtils = require("./dateUtils");

var React = _interopRequireWildcard(require("react"));

var _reactNativePaperDates = require("react-native-paper-dates");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useDateInput(_ref) {
  let {
    locale,
    value,
    validRange,
    inputMode,
    onChange
  } = _ref;
  const {
    isDisabled,
    isWithinValidRange,
    validStart,
    validEnd
  } = (0, _dateUtils.useRangeChecker)(validRange);
  const [error, setError] = React.useState(null);
  const formatter = (0, _dateUtils.useInputFormatter)({
    locale
  });
  const inputFormat = (0, _dateUtils.useInputFormat)({
    formatter
  });
  const formattedValue = formatter.format(value);

  const onChangeText = date => {
    const dayIndex = inputFormat.indexOf('DD');
    const monthIndex = inputFormat.indexOf('MM');
    const yearIndex = inputFormat.indexOf('YYYY');
    const day = Number(date.slice(dayIndex, dayIndex + 2));
    const year = Number(date.slice(yearIndex, yearIndex + 4));
    const month = Number(date.slice(monthIndex, monthIndex + 2));

    if (Number.isNaN(day) || Number.isNaN(year) || Number.isNaN(month)) {
      setError((0, _reactNativePaperDates.getTranslation)(locale, 'notAccordingToDateFormat', () => 'notAccordingToDateFormat')(inputFormat));
      return;
    }

    const finalDate = inputMode === 'end' ? new Date(year, month - 1, day, 23, 59, 59) : new Date(year, month - 1, day);

    if (isDisabled(finalDate)) {
      setError((0, _reactNativePaperDates.getTranslation)(locale, 'dateIsDisabled'));
      return;
    }

    if (!isWithinValidRange(finalDate)) {
      let errors = validStart && validEnd ? [`${(0, _reactNativePaperDates.getTranslation)(locale, 'mustBeBetween')} ${formatter.format(validStart)} - ${formatter.format(validEnd)}`] : [validStart ? `${(0, _reactNativePaperDates.getTranslation)(locale, 'mustBeHigherThan')} ${formatter.format(validStart)}` : '', validEnd ? `${(0, _reactNativePaperDates.getTranslation)(locale, 'mustBeLowerThan')} ${formatter.format(validEnd)}` : ''];
      setError(errors.filter(n => n).join(' '));
      return;
    }

    setError(null);

    if (inputMode === 'end') {
      onChange(finalDate);
    } else {
      onChange(finalDate);
    }
  };

  return {
    onChange,
    error,
    formattedValue,
    onChangeText,
    inputFormat
  };
}
//# sourceMappingURL=inputUtils.js.map