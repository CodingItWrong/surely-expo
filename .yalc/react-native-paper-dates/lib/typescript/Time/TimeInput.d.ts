import * as React from 'react';
import { TextInputProps } from 'react-native';
import { PossibleClockTypes, PossibleInputTypes } from './timeUtils';
interface TimeInputProps extends Omit<Omit<TextInputProps, 'value'>, 'onFocus'> {
    value: number;
    clockType: PossibleClockTypes;
    onPress?: (type: PossibleClockTypes) => any;
    pressed: boolean;
    onChanged: (n: number) => any;
    inputType: PossibleInputTypes;
}
declare const _default: React.ForwardRefExoticComponent<TimeInputProps & React.RefAttributes<unknown>>;
export default _default;
