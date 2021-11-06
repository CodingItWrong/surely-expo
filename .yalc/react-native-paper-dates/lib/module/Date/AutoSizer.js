import * as React from 'react';
import { StyleSheet, View } from 'react-native';
export default function AutoSizer(_ref) {
  let {
    children
  } = _ref;
  const [layout, setLayout] = React.useState(null);
  const onLayout = React.useCallback(event => {
    const nl = event.nativeEvent.layout; // https://github.com/necolas/react-native-web/issues/1704

    if (!layout || layout.width !== nl.width || layout.height !== nl.height) {
      setLayout({
        width: nl.width,
        height: nl.height
      });
    }
  }, [layout, setLayout]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.autoSizer, layout && layout],
    onLayout: onLayout
  }, layout ? children(layout) : null);
}
const styles = StyleSheet.create({
  autoSizer: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=AutoSizer.js.map