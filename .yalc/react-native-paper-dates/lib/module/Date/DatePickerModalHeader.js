import * as React from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { useHeaderTextColor } from '../utils';
import { getTranslation } from '../translations/utils';
export default function DatePickerModalHeader(props) {
  const {
    disableSafeTop,
    locale
  } = props;
  const saveLabel = props.saveLabel || getTranslation(locale, 'save');
  const color = useHeaderTextColor();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animated.View, {
    style: styles.animated
  }, /*#__PURE__*/React.createElement(SafeAreaView, {
    style: [styles.safeContent, disableSafeTop && styles.safeContentNoTop]
  }, /*#__PURE__*/React.createElement(Appbar, {
    style: styles.appbarHeader
  }, /*#__PURE__*/React.createElement(Appbar.Action, {
    icon: "close",
    accessibilityLabel: "Close",
    onPress: props.onDismiss,
    color: color,
    testID: "react-native-paper-dates-close" // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }), /*#__PURE__*/React.createElement(Appbar.Content, {
    title: ''
  }), /*#__PURE__*/React.createElement(Button, {
    color: color,
    onPress: props.onSave,
    testID: "react-native-paper-dates-save"
  }, saveLabel)))));
}
const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  animated: {
    paddingBottom: 0,
    elevation: 4
  },
  safeContent: {
    paddingBottom: 0
  },
  safeContentNoTop: {
    paddingTop: 0
  },
  header: {
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 12
  },
  headerContentContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  label: {
    color: '#fff',
    letterSpacing: 1,
    fontSize: 13
  },
  singleHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  rangeHeaderText: {
    color: '#fff',
    fontSize: 25
  },
  headerTextFilled: {
    color: 'rgba(255,255,255,1)'
  },
  headerTextEmpty: {
    color: 'rgba(255,255,255,0.5)'
  },
  headerSeparator: {
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
    paddingLeft: 6,
    paddingRight: 6
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent' // alignItems:'center'

  }
});
//# sourceMappingURL=DatePickerModalHeader.js.map