import * as React from 'react';
export declare function TimePickerModal({ visible, onDismiss, onConfirm, hours, minutes, label, cancelLabel, confirmLabel, animationType, locale, }: {
    locale?: undefined | string;
    label?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    hours?: number | undefined;
    minutes?: number | undefined;
    visible: boolean | undefined;
    onDismiss: () => any;
    onConfirm: (hoursAndMinutes: {
        hours: number;
        minutes: number;
    }) => any;
    animationType?: 'slide' | 'fade' | 'none';
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof TimePickerModal>;
export default _default;
