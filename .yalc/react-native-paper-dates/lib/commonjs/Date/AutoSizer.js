"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AutoSizer;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AutoSizer(_ref) {
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
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.autoSizer, layout && layout],
    onLayout: onLayout
  }, layout ? children(layout) : null);
}

const styles = _reactNative.StyleSheet.create({
  autoSizer: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=AutoSizer.js.map