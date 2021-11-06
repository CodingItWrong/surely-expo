function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, TouchableRipple } from 'react-native-paper';
import Color from 'color';
import { inputTypes, useInputColors } from './timeUtils';

function TimeInput(_ref, ref) {
  let {
    value,
    clockType,
    pressed,
    onPress,
    onChanged,
    inputType,
    ...rest
  } = _ref;
  const [controlledValue, setControlledValue] = React.useState(`${value}`);

  const onInnerChange = text => {
    setControlledValue(text);

    if (text !== '' && text !== '0') {
      onChanged(Number(text));
    }
  };

  React.useEffect(() => {
    setControlledValue(`${value}`);
  }, [value]);
  const theme = useTheme();
  const [inputFocused, setInputFocused] = React.useState(false);
  const highlighted = inputType === inputTypes.picker ? pressed : inputFocused;
  const {
    color,
    backgroundColor
  } = useInputColors(highlighted);
  let formattedValue = controlledValue;

  if (!inputFocused) {
    formattedValue = controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
  }

  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    ref: ref,
    style: [styles.input, {
      color,
      backgroundColor,
      borderRadius: theme.roundness
    }],
    value: formattedValue,
    maxLength: 2,
    onFocus: () => setInputFocused(true),
    onBlur: () => setInputFocused(false),
    keyboardAppearance: theme.dark ? 'dark' : 'default',
    keyboardType: "number-pad",
    onChangeText: onInnerChange
  }, rest)), onPress && inputType === inputTypes.picker ? /*#__PURE__*/React.createElement(TouchableRipple, {
    style: [StyleSheet.absoluteFill, styles.buttonOverlay, {
      // backgroundColor: 'blue',
      borderRadius: theme.roundness
    }],
    rippleColor: Color(theme.colors.primary).fade(0.7).hex(),
    onPress: () => onPress(clockType),
    borderless: true // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }, /*#__PURE__*/React.createElement(View, null)) : null);
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: 80,
    width: 96
  },
  input: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 96,
    height: 80
  },
  buttonOverlay: {
    overflow: 'hidden'
  }
});
export default /*#__PURE__*/React.forwardRef(TimeInput);
//# sourceMappingURL=TimeInput.js.map