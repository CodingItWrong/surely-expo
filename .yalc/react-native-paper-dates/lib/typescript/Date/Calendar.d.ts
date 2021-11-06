import * as React from 'react';
import { DisableWeekDaysType } from './dateUtils';
export declare type ModeType = 'single' | 'range' | 'multiple';
export declare type ScrollModeType = 'horizontal' | 'vertical';
export declare type ValidRangeType = {
    startDate?: Date;
    endDate?: Date;
    disabledDates?: Date[];
};
export declare type BaseCalendarProps = {
    locale: string;
    disableWeekDays?: DisableWeekDaysType;
    validRange?: ValidRangeType;
    date?: CalendarDate;
    dates?: CalendarDates;
    startDate?: CalendarDate;
    endDate?: CalendarDate;
    dateMode?: 'start' | 'end';
};
export declare type CalendarDate = Date | undefined;
export declare type CalendarDates = Date[] | undefined | null;
export declare type RangeChange = (params: {
    startDate: CalendarDate;
    endDate: CalendarDate;
}) => any;
export declare type SingleChange = (params: {
    date: CalendarDate;
}) => void;
export declare type MultiChange = (params: {
    dates: CalendarDates;
    datePressed: Date;
    change: 'added' | 'removed';
}) => any;
export declare type MultiConfirm = (params: {
    dates: Date[];
}) => void;
export interface CalendarSingleProps extends BaseCalendarProps {
    mode: 'single';
    date: CalendarDate;
    onChange: SingleChange;
}
export interface CalendarRangeProps extends BaseCalendarProps {
    mode: 'range';
    startDate: CalendarDate;
    endDate: CalendarDate;
    onChange: RangeChange;
}
export interface CalendarMultiProps extends BaseCalendarProps {
    mode: 'multiple';
    dates: CalendarDates;
    onChange: MultiChange;
}
declare function Calendar(props: CalendarSingleProps | CalendarRangeProps | CalendarMultiProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Calendar>;
export default _default;
