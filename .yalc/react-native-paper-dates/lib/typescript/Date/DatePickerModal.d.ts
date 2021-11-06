import * as React from 'react';
import { DatePickerModalContentMultiProps, DatePickerModalContentRangeProps, DatePickerModalContentSingleProps } from './DatePickerModalContent';
interface DatePickerModalProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
}
export interface DatePickerModalSingleProps extends DatePickerModalContentSingleProps, DatePickerModalProps {
}
export interface DatePickerModalMultiProps extends DatePickerModalContentMultiProps, DatePickerModalProps {
}
export interface DatePickerModalRangeProps extends DatePickerModalContentRangeProps, DatePickerModalProps {
}
export declare function DatePickerModal(props: DatePickerModalRangeProps | DatePickerModalSingleProps | DatePickerModalMultiProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DatePickerModal>;
export default _default;
