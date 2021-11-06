import { PossibleClockTypes } from './timeUtils';
import * as React from 'react';
declare function AnalogClock({ hours, minutes, focused, is24Hour, onChange, }: {
    hours: number;
    minutes: number;
    focused: PossibleClockTypes;
    is24Hour: boolean;
    onChange: (hoursMinutesAndFocused: {
        hours: number;
        minutes: number;
        focused?: undefined | PossibleClockTypes;
    }) => any;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof AnalogClock>;
export default _default;
