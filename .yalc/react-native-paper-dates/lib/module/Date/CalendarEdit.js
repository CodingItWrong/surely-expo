import * as React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import DatePickerInput from './DatePickerInput';

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
      Keyboard.dismiss();
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.inner
  }, mode === 'single' ? /*#__PURE__*/React.createElement(DatePickerInput, {
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
  }) : null, mode === 'range' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DatePickerInput, {
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
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.separator
  }), /*#__PURE__*/React.createElement(DatePickerInput, {
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

const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.memo(CalendarEdit);
//# sourceMappingURL=CalendarEdit.js.map