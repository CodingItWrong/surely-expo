function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Color from 'color';
import { PanResponder, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { circleSize, clockTypes, getAngle, getHours, getHourType, getMinutes } from './timeUtils';
import * as React from 'react';
import { useLatest } from '../utils';
import AnalogClockHours from './AnalogClockHours';
import AnimatedClockSwitcher from './AnimatedClockSwitcher';
import AnalogClockMinutes from './AnalogClockMinutes';
import { DisplayModeContext } from './TimePicker';

function AnalogClock(_ref) {
  let {
    hours,
    minutes,
    focused,
    is24Hour,
    onChange
  } = _ref;
  const theme = useTheme();
  const {
    mode
  } = React.useContext(DisplayModeContext); // used to make pointer shorter if hours are selected and above 12

  const shortPointer = (hours === 0 || hours > 12) && is24Hour;
  const clockRef = React.useRef(null); // Hooks are nice, sometimes... :-)..
  // We need the latest values, since the onPointerMove uses a closure to the function

  const hoursRef = useLatest(hours);
  const onChangeRef = useLatest(onChange);
  const minutesRef = useLatest(minutes);
  const focusedRef = useLatest(focused);
  const is24HourRef = useLatest(is24Hour);
  const modeRef = useLatest(mode);
  const onPointerMove = React.useCallback((e, final) => {
    let x = e.nativeEvent.locationX;
    let y = e.nativeEvent.locationY;
    let angle = getAngle(x, y, circleSize);

    if (focusedRef.current === clockTypes.hours) {
      let hours24 = is24HourRef.current;
      let previousHourType = getHourType(hoursRef.current);
      let pickedHours = getHours(angle, previousHourType);
      let hours12AndPm = !hours24 && modeRef.current === 'PM'; // Avoiding the "24h"
      // Should be 12h for 12 hours and PM mode

      if ((hours12AndPm || hours24) && pickedHours + 12 < 24) {
        pickedHours += 12;
      }

      if (pickedHours === 24) {
        pickedHours = 0;
      }

      if (hoursRef.current !== pickedHours || final) {
        onChangeRef.current({
          hours: pickedHours,
          minutes: minutesRef.current,
          focused: final ? clockTypes.minutes : undefined
        });
      }
    } else if (focusedRef.current === clockTypes.minutes) {
      let pickedMinutes = getMinutes(angle);

      if (minutesRef.current !== pickedMinutes) {
        onChangeRef.current({
          hours: hoursRef.current,
          minutes: pickedMinutes
        });
      }
    }
  }, [focusedRef, is24HourRef, hoursRef, onChangeRef, minutesRef, modeRef]);
  const panResponder = React.useRef(PanResponder.create({
    onPanResponderGrant: e => onPointerMove(e, false),
    onPanResponderMove: e => onPointerMove(e, false),
    onPanResponderRelease: e => onPointerMove(e, true),
    onStartShouldSetPanResponder: returnTrue,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: returnTrue,
    onMoveShouldSetPanResponderCapture: returnTrue,
    onPanResponderTerminationRequest: returnTrue,
    onShouldBlockNativeResponder: returnTrue
  })).current;
  const dynamicSize = focused === clockTypes.hours && shortPointer ? 33 : 0;
  const pointerNumber = focused === clockTypes.hours ? hours : minutes;
  const degreesPerNumber = focused === clockTypes.hours ? 30 : 6;
  return /*#__PURE__*/React.createElement(View, _extends({
    ref: clockRef
  }, panResponder.panHandlers, {
    style: [styles.clock, {
      backgroundColor: theme.dark ? Color(theme.colors.surface).lighten(1.2).hex() : Color(theme.colors.surface).darken(0.1).hex()
    }] // @ts-ignore -> https://github.com/necolas/react-native-web/issues/506
    ,
    cursor: 'pointer'
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.line, {
      backgroundColor: theme.colors.primary,
      transform: [{
        rotate: -90 + pointerNumber * degreesPerNumber + 'deg'
      }, {
        translateX: circleSize / 4 - 4 - dynamicSize / 2
      }],
      width: circleSize / 2 - 4 - dynamicSize
    }],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.endPoint, {
      backgroundColor: theme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, styles.center],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.middlePoint, {
      backgroundColor: theme.colors.primary
    }]
  })), /*#__PURE__*/React.createElement(AnimatedClockSwitcher, {
    focused: focused,
    hours: /*#__PURE__*/React.createElement(AnalogClockHours, {
      is24Hour: is24Hour,
      hours: hours
    }),
    minutes: /*#__PURE__*/React.createElement(AnalogClockMinutes, {
      minutes: minutes
    })
  }));
}

const styles = StyleSheet.create({
  clock: {
    height: circleSize,
    width: circleSize,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: circleSize / 2
  },
  middlePoint: {
    borderRadius: 4,
    height: 8,
    width: 8
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  endPoint: {
    borderRadius: 15,
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
    bottom: -14
  },
  line: {
    position: 'absolute',
    marginBottom: -1,
    height: 2,
    borderRadius: 4
  }
});

function returnTrue() {
  return true;
}

export default /*#__PURE__*/React.memo(AnalogClock);
//# sourceMappingURL=AnalogClock.js.map