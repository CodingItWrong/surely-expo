function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import TextInputWithMask from '../TextInputMask';
import { HelperText, IconButton, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import DatePickerModal from './DatePickerModal';
import useDateInput from './inputUtils';
import { useLatest } from '../utils';

function DatePickerInput(_ref, ref) {
  let {
    label,
    value,
    onChange,
    style,
    locale,
    validRange,
    inputMode,
    withModal = true,
    withDateFormatInLabel = true,
    ...rest
  } = _ref;
  const theme = useTheme();
  const {
    formattedValue,
    inputFormat,
    onChangeText,
    error
  } = useDateInput({
    locale,
    value,
    validRange,
    inputMode,
    onChange
  });
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onChangeRef = useLatest(onChange);
  const onInnerConfirm = React.useCallback(_ref2 => {
    let {
      date
    } = _ref2;
    setVisible(false);
    onChangeRef.current(date);
  }, [setVisible, onChangeRef]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(TextInputWithMask, _extends({}, rest, {
    ref: ref,
    label: getLabel({
      label,
      inputFormat,
      withDateFormatInLabel
    }),
    value: formattedValue,
    keyboardType: 'number-pad',
    placeholder: inputFormat,
    mask: inputFormat,
    onChangeText: onChangeText,
    keyboardAppearance: theme.dark ? 'dark' : 'default',
    error: !!error,
    style: [styles.input, style]
  })), withModal ? /*#__PURE__*/React.createElement(IconButton, {
    size: 24,
    style: styles.calendarButton,
    icon: "calendar",
    onPress: () => setVisible(true) // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }) : null), /*#__PURE__*/React.createElement(HelperText, {
    type: "error",
    visible: !!error
  }, error), withModal ? /*#__PURE__*/React.createElement(DatePickerModal, {
    date: value,
    mode: "single",
    visible: visible,
    onDismiss: onDismiss,
    onConfirm: onInnerConfirm,
    locale: locale,
    dateMode: inputMode
  }) : null);
}

function getLabel(_ref3) {
  let {
    withDateFormatInLabel,
    inputFormat,
    label
  } = _ref3;

  if (withDateFormatInLabel) {
    return label ? `${label} (${inputFormat})` : inputFormat;
  }

  return label || '';
}

const styles = StyleSheet.create({
  root: {
    minWidth: 150,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    flexGrow: 1,
    alignSelf: 'flex-start'
  },
  input: {
    flexGrow: 1
  },
  calendarButton: {
    position: 'absolute',
    right: 0
  }
});
export default /*#__PURE__*/React.forwardRef(DatePickerInput);
//# sourceMappingURL=DatePickerInput.js.map