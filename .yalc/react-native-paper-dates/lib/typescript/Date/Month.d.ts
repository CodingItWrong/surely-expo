import * as React from 'react';
import { DisableWeekDaysType } from './dateUtils';
import type { CalendarDate, CalendarDates, ModeType, ValidRangeType } from './Calendar';
interface BaseMonthProps {
    locale: undefined | string;
    scrollMode: 'horizontal' | 'vertical';
    disableWeekDays?: DisableWeekDaysType;
    mode: ModeType;
    index: number;
    onPressYear: (year: number) => any;
    selectingYear: boolean;
    onPressDate: (date: Date) => any;
    primaryColor: string;
    selectColor: string;
    roundness: number;
    validRange?: ValidRangeType;
    startDate?: CalendarDate;
    endDate?: CalendarDate;
    date?: CalendarDate;
    dates?: CalendarDates;
}
interface MonthRangeProps extends BaseMonthProps {
    mode: 'range';
    startDate: CalendarDate;
    endDate: CalendarDate;
}
interface MonthSingleProps extends BaseMonthProps {
    mode: 'single';
    date: CalendarDate;
}
interface MonthMultiProps extends BaseMonthProps {
    mode: 'multiple';
    dates: CalendarDates;
}
declare function Month(props: MonthSingleProps | MonthRangeProps | MonthMultiProps): JSX.Element;
export declare const weekMargin = 6;
export declare const weekSize: number;
export declare const montHeaderHeight = 56;
export declare const monthHeaderSingleMarginTop = 4;
export declare const monthHeaderSingleMarginBottom: number;
export declare const monthHeaderSingleHeight: number;
export declare function getIndexFromHorizontalOffset(offset: number, width: number): number;
export declare function getIndexFromVerticalOffset(offset: number): number;
export declare function getHorizontalMonthOffset(index: number, width: number): number;
export declare function getVerticalMonthsOffset(index: number): number;
export declare function getMonthHeight(scrollMode: 'horizontal' | 'vertical', index: number): number;
declare const _default: React.MemoExoticComponent<typeof Month>;
export default _default;
