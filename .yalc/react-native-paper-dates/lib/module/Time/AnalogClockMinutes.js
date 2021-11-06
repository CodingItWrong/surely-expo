import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { circleSize } from './timeUtils';
import { useTextColorOnPrimary } from '../utils';

function AnalogClockMinutes(_ref) {
  let {
    minutes
  } = _ref;
  const range = getMinuteNumbers(circleSize, 12);
  const color = useTextColorOnPrimary();
  return /*#__PURE__*/React.createElement(React.Fragment, null, range.map((a, i) => {
    const currentMinutes = i * 5;
    const isZero = currentMinutes === 0;
    let isCurrent = currentMinutes - 1 <= minutes && currentMinutes + 1 >= minutes;

    if (isZero) {
      isCurrent = minutes >= 59 || currentMinutes + 1 >= minutes;
    }

    return /*#__PURE__*/React.createElement(View, {
      key: i,
      pointerEvents: "none",
      style: [styles.outerHourRoot, {
        top: a[1] || 0,
        left: a[0] || 0
      }]
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.outerHourInner
    }, /*#__PURE__*/React.createElement(Text, {
      style: isCurrent ? {
        color
      } : undefined,
      selectable: false
    }, isZero ? '00' : currentMinutes)));
  }));
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
  },
  textWhite: {
    color: '#fff'
  }
});

function getMinuteNumbers(size, count) {
  let angle = 0;
  let step = 2 * Math.PI / count;
  let radius = size / 2.5;
  angle = angle = -90 * Math.PI / 180;
  return Array(12).fill(true).map(() => {
    let x = Math.round(size / 2 + radius * Math.cos(angle));
    let y = Math.round(size / 2 + radius * Math.sin(angle));
    angle += step;
    return [x, y];
  });
}

export default /*#__PURE__*/React.memo(AnalogClockMinutes);
//# sourceMappingURL=AnalogClockMinutes.js.map