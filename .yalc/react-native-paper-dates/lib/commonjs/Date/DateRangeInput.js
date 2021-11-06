"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateRangeInput;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _DatePickerModal = _interopRequireDefault(require("./DatePickerModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// WORK IN PROGRESS
function DateRangeInput(_ref) {
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, null, "Van")), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: {
      fontSize: 16,
      marginLeft: 12,
      marginRight: 12
    }
  }, "to"), /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: {
      opacity: 0
    },
    accessible: false
  }, "tot")), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNativePaper.Text, null, "Tot")), /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNativePaper.IconButton, {
    icon: "calendar",
    onPress: () => setVisible(true) // RN types bug
    ,
    hasTVPreferredFocus: undefined,
    tvParallaxProperties: undefined
  }), /*#__PURE__*/React.createElement(_reactNativePaper.Text, {
    style: {
      opacity: 0
    },
    accessible: false
  }, "tot")), /*#__PURE__*/React.createElement(_DatePickerModal.default, {
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