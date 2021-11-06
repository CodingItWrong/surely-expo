import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { circleSize } from './timeUtils';
import { useTextColorOnPrimary } from '../utils';
import { DisplayModeContext } from './TimePicker';

function AnalogClockHours(_ref) {
  let {
    is24Hour,
    hours
  } = _ref;
  const {
    mode
  } = React.useContext(DisplayModeContext);
  const outerRange = getHourNumbers(false, circleSize, 12, 12);
  const innerRange = getHourNumbers(true, circleSize, 12, 12);
  const color = useTextColorOnPrimary();
  return /*#__PURE__*/React.createElement(React.Fragment, null, outerRange.map((a, i) => /*#__PURE__*/React.createElement(View, {
    key: i,
    pointerEvents: "none",
    style: [styles.outerHourRoot, {
      top: a[1] || 0,
      left: a[0] || 0
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.outerHourInner
  }, /*#__PURE__*/React.createElement(Text, {
    style: hours === i + 1 ? {
      color
    } : null,
    selectable: false
  }, mode === 'AM' && i + 1 === 12 ? '00' : i + 1)))), is24Hour ? innerRange.map((a, i) => /*#__PURE__*/React.createElement(View, {
    key: i,
    pointerEvents: "none",
    style: [styles.innerHourRoot, {
      top: a[1] || 0,
      left: a[0] || 0
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.innerHourInner
  }, /*#__PURE__*/React.createElement(Text, {
    selectable: false,
    style: [styles.innerHourText, i + 13 === hours || i + 13 === 24 && hours === 0 ? {
      color
    } : null]
  }, i + 13 === 24 ? '00' : i + 13)))) : null);
}

const styles = StyleSheet.create({
  outerHourRoot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    width: 50,
    height: 50,
    marginLeft: -25,
    marginTop: -25,
    borderRadius: 25
  },
  outerHourInner: {
    borderRadius: 25
  },
  innerHourRoot: {
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20
  },
  innerHourInner: {
    borderRadius: 20
  },
  innerHourText: {
    fontSize: 13
  }
});

function getHourNumbers(is24Hour, size, count, arrayLength) {
  let angle = 0;
  let step = 2 * Math.PI / count;
  let radius = size / (is24Hour ? 4 : 2.5);
  angle = -90 * Math.PI / 180 + Math.PI / 6;
  return Array(arrayLength).fill(true).map(() => {
    let x = Math.round(size / 2 + radius * Math.cos(angle));
    let y = Math.round(size / 2 + radius * Math.sin(angle));
    angle += step;
    return [x, y];
  });
}

export default /*#__PURE__*/React.memo(AnalogClockHours);
//# sourceMappingURL=AnalogClockHours.js.map