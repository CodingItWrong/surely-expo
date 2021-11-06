function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { TextInput } from 'react-native-paper';
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
  return /*#__PURE__*/React.createElement(TextInput, _extends({
    ref: ref
  }, rest, {
    value: controlledValue,
    onChangeText: onInnerChange
  }));
}

export default /*#__PURE__*/React.forwardRef(TextInputWithMask);
//# sourceMappingURL=TextInputMask.js.map