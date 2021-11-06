import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useMemo } from 'react';
import Color from 'color';
import { useSwitchColors } from './timeUtils';
import { DisplayModeContext } from './TimePicker';
export default function AmPmSwitcher(_ref) {
  let {
    onChange,
    hours
  } = _ref;
  const {
    setMode,
    mode
  } = React.useContext(DisplayModeContext);
  const theme = useTheme();
  const backgroundColor = useMemo(() => {
    if (theme.dark) {
      return Color(theme.colors.surface).lighten(1.2).hex();
    }

    return Color(theme.colors.surface).darken(0.1).hex();
  }, [theme]);
  const isAM = mode === 'AM';
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.root, {
      borderColor: backgroundColor,
      borderRadius: theme.roundness
    }]
  }, /*#__PURE__*/React.createElement(SwitchButton, {
    label: "AM",
    onPress: () => {
      setMode('AM');

      if (hours - 12 >= 0) {
        onChange(hours - 12);
      }
    },
    selected: isAM,
    disabled: isAM
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.switchSeparator, {
      backgroundColor
    }]
  }), /*#__PURE__*/React.createElement(SwitchButton, {
    label: "PM",
    onPress: () => {
      setMode('PM');

      if (hours + 12 <= 24) {
        onChange(hours + 12);
      }
    },
    selected: !isAM,
    disabled: !isAM
  }));
}

function SwitchButton(_ref2) {
  let {
    label,
    onPress,
    selected,
    disabled
  } = _ref2;
  const theme = useTheme();
  const {
    backgroundColor,
    color
  } = useSwitchColors(selected);
  return /*#__PURE__*/React.createElement(TouchableRipple, {
    onPress: onPress,
    style: styles.switchButton,
    accessibilityLabel: label // @ts-ignore old React Native versions
    ,
    accessibilityTraits: disabled ? ['button', 'disabled'] : 'button' // @ts-ignore old React Native versions
    ,
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      disabled
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.switchButtonInner, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    selectable: false,
    style: [{ ...theme.fonts.medium,
      color: color
    }]
  }, label)));
}

const styles = StyleSheet.create({
  root: {
    width: 50,
    height: 80,
    borderWidth: 1,
    overflow: 'hidden'
  },
  switchSeparator: {
    height: 1,
    width: 48
  },
  switchButton: {
    flex: 1
  },
  switchButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=AmPmSwitcher.js.map