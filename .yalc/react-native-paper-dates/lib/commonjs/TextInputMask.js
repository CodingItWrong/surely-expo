"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNativePaper = require("react-native-paper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const splitCharacters = ['-', '/', '.', '年', ' '];

function detectCharacter(mask) {
  const c = splitCharacters.find(ch => mask.includes(ch));
  return c || '';
}

function enhanceTextWithMask(text, mask, previousValue) {
  const isBackSpace = previousValue.length > text.length;
  const splitCharacter = detectCharacter(mask);
  const maskParts = mask.split(splitCharacter);
  const textParts = text.split(splitCharacter);
  let finalString = [];

  for (let maskPartIndex = 0; maskPartIndex < mask.length; maskPartIndex++) {
    let partString = [];
    const maskPart = maskParts[maskPartIndex];
    const textPart = textParts[maskPartIndex];

    if (!textPart) {
      continue;
    }

    for (let maskDigitIndex = 0; maskDigitIndex < maskPart.length; maskDigitIndex++) {
      const currentCharacter = textPart[maskDigitIndex];

      if (isBackSpace && currentCharacter === undefined) {
        continue;
      }

      const character = textPart[maskDigitIndex];

      if (character !== undefined) {
        partString.push(character);
      }
    }

    finalString.push(partString.join(''));
  }

  const lastPart = finalString[finalString.length - 1];
  const lastMaskPart = maskParts[finalString.length - 1];

  if ( // if mask is completed
  finalString.length !== maskParts.length && // or ...
  lastPart && lastMaskPart && lastPart.length === lastMaskPart.length) {
    return finalString.join(splitCharacter) + (isBackSpace ? '' : splitCharacter);
  }

  return finalString.join(splitCharacter);
}

function TextInputWithMask(_ref, ref) {
  let {
    onChangeText,
    value,
    mask,
    ...rest
  } = _ref;
  const [controlledValue, setControlledValue] = React.useState(value || '');

  const onInnerChange = text => {
    const enhancedText = enhanceTextWithMask(text, mask, controlledValue);
    setControlledValue(enhancedText);

    if (text.length === mask.length) {
      onChangeText && onChangeText(text);
    }
  };

  React.useEffect(() => {
    setControlledValue(value || '');
  }, [value]);
  return /*#__PURE__*/React.createElement(_reactNativePaper.TextInput, _extends({
    ref: ref
  }, rest, {
    value: controlledValue,
    onChangeText: onInnerChange
  }));
}

var _default = /*#__PURE__*/React.forwardRef(TextInputWithMask);

exports.default = _default;
//# sourceMappingURL=TextInputMask.js.map