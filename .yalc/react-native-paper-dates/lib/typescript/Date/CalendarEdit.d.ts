import * as React from 'react';
import type { ModeType, ValidRangeType } from './Calendar';
import type { LocalState } from './DatePickerModalContent';
declare function CalendarEdit({ mode, state, label, startLabel, endLabel, collapsed, onChange, validRange, locale, }: {
    mode: ModeType;
    label?: string;
    startLabel?: string;
    endLabel?: string;
    state: LocalState;
    collapsed: boolean;
    onChange: (s: LocalState) => any;
    validRange: ValidRangeType | undefined;
    locale: string;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CalendarEdit>;
export default _default;
