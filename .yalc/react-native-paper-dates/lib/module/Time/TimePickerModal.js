import * as React from 'react';
import { Modal, StyleSheet, View, Text, Animated, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button, IconButton, overlay, useTheme } from 'react-native-paper';
import TimePicker from './TimePicker';
import { clockTypes, inputTypeIcons, inputTypes, reverseInputTypes } from './timeUtils';
const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
export function TimePickerModal(_ref) {
  let {
    visible,
    onDismiss,
    onConfirm,
    hours,
    minutes,
    label = 'Select time',
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    locale
  } = _ref;
  const theme = useTheme();
  const [inputType, setInputType] = React.useState(inputTypes.picker);
  const [focused, setFocused] = React.useState(clockTypes.hours);
  const [localHours, setLocalHours] = React.useState(getHours(hours));
  const [localMinutes, setLocalMinutes] = React.useState(getMinutes(minutes));
  React.useEffect(() => {
    setLocalHours(getHours(hours));
  }, [setLocalHours, hours]);
  React.useEffect(() => {
    setLocalMinutes(getMinutes(minutes));
  }, [setLocalMinutes, minutes]);
  const onFocusInput = React.useCallback(type => setFocused(type), []);
  const onChange = React.useCallback(params => {
    if (params.focused) {
      setFocused(params.focused);
    }

    setLocalHours(params.hours);
    setLocalMinutes(params.minutes);
  }, [setFocused, setLocalHours, setLocalMinutes]);
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: animationType,
    transparent: true,
    visible: visible,
    onRequestClose: onDismiss,
    presentationStyle: "overFullScreen",
    supportedOrientations: supportedOrientations //@ts-ignore
    ,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onDismiss
  }, /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: theme.colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    style: styles.keyboardView,
    behavior: 'padding'
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.modalContent, {
      backgroundColor: theme.dark ? overlay(10, theme.colors.surface) : theme.colors.surface,
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.labelContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, {
      color: theme.colors.text
    }]
  }, label.toUpperCase())), /*#__PURE__*/React.createElement(View, {
    style: styles.timePickerContainer
  }, /*#__PURE__*/React.createElement(TimePicker, {
    locale: locale,
    inputType: inputType,
    focused: focused,
    hours: localHours,
    minutes: localMinutes,
    onChange: onChange,
    onFocusInput: onFocusInput
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.bottom
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: inputTypeIcons[reverseInputTypes[inputType]],
    onPress: () => setInputType(reverseInputTypes[inputType]),
    size: 24,
    style: styles.inputTypeToggle,
    accessibilityLabel: "toggle keyboard" // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.fill
  }), /*#__PURE__*/React.createElement(Button, {
    onPress: onDismiss
  }, cancelLabel), /*#__PURE__*/React.createElement(Button, {
    onPress: () => onConfirm({
      hours: localHours,
      minutes: localMinutes
    })
  }, confirmLabel)))))));
}

function getMinutes(minutes) {
  return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}

function getHours(hours) {
  return hours === undefined || hours === null ? new Date().getHours() : hours;
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  keyboardView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalBackground: {
    flex: 1
  },
  modalContent: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    minWidth: 287
  },
  labelContainer: {
    height: 28,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24
  },
  label: {
    letterSpacing: 1,
    fontSize: 13
  },
  timePickerContainer: {
    padding: 24
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  inputTypeToggle: {
    margin: 4
  },
  fill: {
    flex: 1
  }
});
export default /*#__PURE__*/React.memo(TimePickerModal);
//# sourceMappingURL=TimePickerModal.js.map