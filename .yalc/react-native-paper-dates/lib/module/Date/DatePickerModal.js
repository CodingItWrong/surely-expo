function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View, Platform, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import DatePickerModalContent from './DatePickerModalContent';
import { useHeaderBackgroundColor, useHeaderColorIsLight } from '../utils';
export function DatePickerModal(props) {
  const theme = useTheme();
  const dimensions = useWindowDimensions();
  const {
    visible,
    animationType,
    disableStatusBar,
    disableStatusBarPadding,
    ...rest
  } = props;
  const animationTypeCalculated = animationType || Platform.select({
    web: 'none',
    default: 'slide'
  });
  const isLight = useHeaderColorIsLight();
  const headerBackgroundColor = useHeaderBackgroundColor();
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Modal, {
    animationType: animationTypeCalculated,
    transparent: true,
    visible: visible,
    onRequestClose: rest.onDismiss,
    presentationStyle: "overFullScreen",
    supportedOrientations: supportedOrientations //@ts-ignore
    ,
    statusBarTranslucent: true
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: rest.onDismiss
  }, /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalBackground, {
      backgroundColor: theme.colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.modalRoot],
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.modalContent, {
      backgroundColor: theme.colors.surface
    }, dimensions.width > 650 ? styles.modalContentBig : null]
  }, disableStatusBar ? null : /*#__PURE__*/React.createElement(StatusBar, {
    translucent: true,
    barStyle: isLight ? 'dark-content' : 'light-content'
  }), disableStatusBarPadding ? null : /*#__PURE__*/React.createElement(View, {
    style: [{
      height: StatusBar.currentHeight,
      backgroundColor: headerBackgroundColor
    }]
  }), /*#__PURE__*/React.createElement(DatePickerModalContent, _extends({}, rest, {
    disableSafeTop: disableStatusBar
  })))))));
}
const supportedOrientations = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalBackground: {
    flex: 1
  },
  modalContent: {
    flex: 1,
    width: '100%'
  },
  modalContentBig: {
    maxWidth: 600,
    maxHeight: 800,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden'
  }
});
export default /*#__PURE__*/React.memo(DatePickerModal);
//# sourceMappingURL=DatePickerModal.js.map