import type { ValidRangeType } from './Calendar';
export declare type DisableWeekDaysType = number[];
export declare function showWeekDay(dayIndex: number, disableWeekDays?: DisableWeekDaysType): boolean;
export declare function dateToUnix(d: Date): number;
export declare function addMonths(date: Date, count: number): Date;
export declare function getDaysInMonth({ year, month, }: {
    year: number;
    month: number;
}): number;
export declare function getFirstDayOfMonth({ year, month, }: {
    year: number;
    month: number;
}): number;
export declare function useRangeChecker(validRange: ValidRangeType | undefined): {
    isDisabled: (day: Date) => boolean;
    isWithinValidRange: (day: Date) => boolean;
    validStart: Date | undefined;
    validEnd: Date | undefined;
};
export declare function areDatesOnSameDay(a: Date, b?: Date | null | undefined): boolean;
export declare function isDateBetween(date: Date, { startDate, endDate, }: {
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
}): boolean;
/**
 * Check if a date is within an optional range.
 *
 * If the range doesn't exist, it defaults to `true`.
 */
export declare function isDateWithinOptionalRange(date: Date, { startUnix, endUnix, }: {
    startUnix: number | undefined;
    endUnix: number | undefined;
}): boolean;
export declare function isLeapYear({ year }: {
    year: number;
}): boolean;
export declare const daySize = 46;
export declare const estimatedMonthHeight = 360;
export declare const startAtIndex = 1200;
export declare const totalMonths: number;
export declare const beginOffset: number;
export declare const gridCounts: (number | undefined)[];
export declare function getGridCount(index: number): number;
export declare function getGridCountForDate(date: Date): number;
export declare function getRealIndex(index: number): number;
export declare function getInitialIndex(date: Date | undefined): number;
export declare function useInputFormatter({ locale }: {
    locale: string | undefined;
}): Intl.DateTimeFormat;
export declare function getStartOfDay(d: Date): Date;
export declare function getEndOfDay(d: Date): Date;
export declare function useInputFormat({ formatter, }: {
    formatter: Intl.DateTimeFormat;
}): string;
export declare function differenceInMonths(firstDate: Date, secondDate: Date): number;
