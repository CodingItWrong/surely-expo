"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerModalContent = DatePickerModalContent;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _AnimatedCrossView = _interopRequireDefault(require("./AnimatedCrossView"));

var _DatePickerModalHeader = _interopRequireDefault(require("./DatePickerModalHeader"));

var _DatePickerModalContentHeader = _interopRequireDefault(require("./DatePickerModalContentHeader"));

var _CalendarEdit = _interopRequireDefault(require("./CalendarEdit"));

var _DatePickerModalHeaderBackground = _interopRequireDefault(require("./DatePickerModalHeaderBackground"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function DatePickerModalContent(props) {
  const {
    mode,
    onChange,
    onConfirm,
    onDismiss,
    disableSafeTop,
    disableWeekDays,
    locale,
    validRange,
    dateMode
  } = props;
  const anyProps = props; // use local state to add only onConfirm state changes

  const [state, setState] = React.useState({
    date: anyProps.date,
    startDate: anyProps.startDate,
    endDate: anyProps.endDate,
    dates: anyProps.dates
  }); // update local state if changed from outside or if modal is opened

  React.useEffect(() => {
    setState({
      date: anyProps.date,
      startDate: anyProps.startDate,
      endDate: anyProps.endDate,
      dates: anyProps.dates
    });
  }, [anyProps.date, anyProps.startDate, anyProps.endDate, anyProps.dates]);
  const [collapsed, setCollapsed] = React.useState(true);
  const onInnerChange = React.useCallback(params => {
    onChange && onChange(params);
    setState(prev => ({ ...prev,
      ...params
    }));
  }, [onChange, setState]);
  const onInnerConfirm = React.useCallback(() => {
    if (mode === 'single') {
      ;
      onConfirm({
        date: state.date
      });
    } else if (mode === 'range') {
      ;
      onConfirm({
        startDate: state.startDate,
        endDate: state.endDate
      });
    } else if (mode === 'multiple') {
      ;
      onConfirm({
        dates: state.dates || []
      });
    }
  }, [state, mode, onConfirm]);
  const onToggleCollapse = React.useCallback(() => {
    setCollapsed(prev => !prev);
  }, [setCollapsed]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_DatePickerModalHeaderBackground.default, null, /*#__PURE__*/React.createElement(_DatePickerModalHeader.default, {
    locale: locale,
    onSave: onInnerConfirm,
    onDismiss: onDismiss,
    saveLabel: props.saveLabel,
    disableSafeTop: disableSafeTop
  }), /*#__PURE__*/React.createElement(_DatePickerModalContentHeader.default, {
    state: state,
    mode: mode,
    collapsed: collapsed,
    onToggle: onToggleCollapse,
    headerSeparator: props.headerSeparator,
    emptyLabel: props.emptyLabel,
    label: props.label,
    moreLabel: props.moreLabel,
    startLabel: props.startLabel,
    endLabel: props.endLabel,
    locale: locale
  })), /*#__PURE__*/React.createElement(_AnimatedCrossView.default, {
    collapsed: collapsed,
    calendar: /*#__PURE__*/React.createElement(_Calendar.default, {
      locale: locale,
      mode: mode,
      startDate: state.startDate,
      endDate: state.endDate,
      date: state.date,
      onChange: onInnerChange,
      disableWeekDays: disableWeekDays,
      dates: state.dates,
      validRange: validRange,
      dateMode: dateMode
    }),
    calendarEdit: /*#__PURE__*/React.createElement(_CalendarEdit.default, {
      mode: mode,
      state: state,
      label: props.label,
      startLabel: props.startLabel,
      endLabel: props.endLabel,
      collapsed: collapsed,
      onChange: onInnerChange,
      validRange: validRange,
      locale: locale
    })
  }));
}

var _default = /*#__PURE__*/React.memo(DatePickerModalContent);

exports.default = _default;
//# sourceMappingURL=DatePickerModalContent.js.map