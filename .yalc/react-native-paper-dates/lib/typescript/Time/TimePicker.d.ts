import * as React from 'react';
import { PossibleClockTypes, PossibleInputTypes } from './timeUtils';
export declare const DisplayModeContext: React.Context<{
    mode: 'AM' | 'PM' | undefined;
    setMode: React.Dispatch<React.SetStateAction<'AM' | 'PM' | undefined>>;
}>;
declare type onChangeFunc = ({ hours, minutes, focused, }: {
    hours: number;
    minutes: number;
    focused?: undefined | PossibleClockTypes;
}) => any;
declare function TimePicker({ hours, minutes, onFocusInput, focused, inputType, onChange, locale, }: {
    locale?: undefined | string;
    inputType: PossibleInputTypes;
    focused: PossibleClockTypes;
    hours: number;
    minutes: number;
    onFocusInput: (type: PossibleClockTypes) => any;
    onChange: onChangeFunc;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof TimePicker>;
export default _default;
