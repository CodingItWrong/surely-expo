export declare const circleSize = 215;
export declare type PossibleHourTypes = 'am' | 'pm';
export declare type HourTypeMap = {
    [hourType in PossibleHourTypes]: PossibleHourTypes;
};
export declare const hourTypes: HourTypeMap;
export declare function getHourType(hours: number): PossibleHourTypes | undefined;
export declare type PossibleInputTypes = 'keyboard' | 'picker';
export declare type InputTypeMap = {
    [inputType in PossibleInputTypes]: PossibleInputTypes;
};
export declare const inputTypes: InputTypeMap;
export declare const reverseInputTypes: InputTypeMap;
declare type InputIconMap = {
    [inputType in PossibleInputTypes]: string;
};
export declare const inputTypeIcons: InputIconMap;
export declare type PossibleClockTypes = 'hours' | 'minutes';
export declare type ClockTypeMap = {
    [clockType in PossibleClockTypes]: PossibleClockTypes;
};
export declare const clockTypes: ClockTypeMap;
/** Snap an angle to a given step. E.g. if angle = 22° and step = 10°, round down to 20° */
export declare function snap(angle: number, step: number): number;
export declare function getHourTypeFromOffset(left: number, top: number, size: number): PossibleHourTypes;
export declare function getMinutes(handAngle: number): number;
export declare function getHours(handAngle: number, hourType: PossibleHourTypes | undefined): number;
/** Get the angle of the left/top co-ordinate from the center of the width.height box */
export declare function getAngle(left: number, top: number, size: number): number;
export declare function useSwitchColors(highlighted: boolean): {
    backgroundColor: string;
    color: string;
};
export declare function useInputColors(highlighted: boolean): {
    backgroundColor: string;
    color: string;
};
export declare function toHourInputFormat(hours: number, is24Hour: boolean): number;
export declare function toHourOutputFormat(newHours: number, previousHours: number, is24Hour: boolean): number;
export {};
