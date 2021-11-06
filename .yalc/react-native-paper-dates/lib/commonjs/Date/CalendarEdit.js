"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _DatePickerInput = _interopRequireDefault(require("./DatePickerInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CalendarEdit(_ref) {
  let {
    mode,
    state,
    label = '',
    startLabel = 'Start',
    endLabel = 'End',
    collapsed,
    onChange,
    validRange,
    locale
  } = _ref;
  const dateInput = React.useRef(null);
  const startInput = React.useRef(null);
  const endInput = React.useRef(null); // when switching views focus, or un-focus text input

  React.useEffect(() => {
    // hide open keyboard
    if (collapsed) {
      _reactNative.Keyboard.dismiss();
    }

    const inputsToFocus = [dateInput.current, startInput.current].filter(n => n);
    const inputsToBlur = [dateInput.current, startInput.current, endInput.current].filter(n => n);

    if (collapsed) {
      inputsToBlur.forEach(ip => ip.blur());
    } else {
      inputsToFocus.forEach(ip => ip.focus());
    }
  }, [mode, startInput, endInput, dateInput, collapsed]);
  const onSubmitStartInput = React.useCallback(() => {
    if (endInput.current) {
      endInput.current.focus();
    }
  }, [endInput]);
  const onSubmitEndInput = React.useCallback(() => {// TODO: close modal and persist range
  }, []);
  const onSubmitInput = React.useCallback(() => {// TODO: close modal and persist range
  }, []);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.inner
  }, mode === 'single' ? /*#__PURE__*/React.createElement(_DatePickerInput.default, {
    inputMode: "start",
    ref: dateInput,
    label: label,
    value: state.date,
    onChange: date => onChange({ ...state,
      date
    }),
    onSubmitEditing: onSubmitInput,
    validRange: validRange,
    locale: locale,
    withModal: false,
    autoCompleteType: 'off'
  }) : null, mode === 'range' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_DatePickerInput.default, {
    inputMode: "start",
    ref: startInput,
    label: startLabel,
    value: state.startDate,
    onChange: startDate => onChange({ ...state,
      startDate
    }),
    returnKeyType: 'next',
    onSubmitEditing: onSubmitStartInput,
    validRange: validRange,
    locale: locale,
    withModal: false,
    autoCompleteType: 'off'
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.separator
  }), /*#__PURE__*/React.createElement(_DatePickerInput.default, {
    inputMode: "end",
    ref: endInput,
    label: endLabel,
    value: state.endDate,
    onChange: endDate => onChange({ ...state,
      endDate
    }),
    onSubmitEditing: onSubmitEndInput,
    validRange: validRange,
    locale: locale,
    withModal: false,
    autoCompleteType: 'off'
  })) : null));
}

const styles = _reactNative.StyleSheet.create({
  root: {
    padding: 12
  },
  inner: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 1
  },
  input: {
    flex: 1
  },
  separator: {
    width: 12
  }
});

var _default = /*#__PURE__*/React.memo(CalendarEdit);

exports.default = _default;
//# sourceMappingURL=CalendarEdit.js.map