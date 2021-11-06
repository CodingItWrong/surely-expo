import type { ValidRangeType } from './Calendar';
export default function useDateInput({ locale, value, validRange, inputMode, onChange, }: {
    onChange: (d: Date) => void;
    locale: undefined | string;
    value: Date | undefined;
    validRange: ValidRangeType | undefined;
    inputMode: 'start' | 'end';
}): {
    onChange: (d: Date) => void;
    error: string | null;
    formattedValue: string;
    onChangeText: (date: string) => void;
    inputFormat: string;
};
