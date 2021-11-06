import * as React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import DatePickerModal from './DatePickerModal'; // WORK IN PROGRESS

export default function DateRangeInput(_ref) {
  let {
    locale
  } = _ref;
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const onConfirm = React.useCallback( // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ref2 => {
    let {
      startDate,
      endDate
    } = _ref2;
    setVisible(false);
    console.log({
      startDate,
      endDate
    });
  }, [setVisible]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, null, "Van")), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 16,
      marginLeft: 12,
      marginRight: 12
    }
  }, "to"), /*#__PURE__*/React.createElement(Text, {
    style: {
      opacity: 0
    },
    accessible: false
  }, "tot")), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Text, null, "Tot")), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(IconButton, {
    icon: "calendar",
    onPress: () => setVisible(true) // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }), /*#__PURE__*/React.createElement(Text, {
    style: {
      opacity: 0
    },
    accessible: false
  }, "tot")), /*#__PURE__*/React.createElement(DatePickerModal, {
    locale: locale,
    mode: "range",
    visible: visible,
    onDismiss: onDismiss,
    onConfirm: onConfirm,
    startDate: undefined,
    endDate: undefined
  }));
}
//# sourceMappingURL=DateRangeInput.js.map