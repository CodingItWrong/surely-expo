import * as React from 'react';
import type { DisableWeekDaysType } from './dateUtils';
export declare function getCalendarHeaderHeight(scrollMode: 'horizontal' | 'vertical'): number;
declare function CalendarHeader({ scrollMode, onPrev, onNext, disableWeekDays, locale, }: {
    locale: undefined | string;
    scrollMode: 'horizontal' | 'vertical';
    onPrev: () => any;
    onNext: () => any;
    disableWeekDays?: DisableWeekDaysType;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CalendarHeader>;
export default _default;
