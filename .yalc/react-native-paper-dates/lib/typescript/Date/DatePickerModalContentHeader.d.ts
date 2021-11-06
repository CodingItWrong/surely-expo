import type { ModeType } from './Calendar';
import type { LocalState } from './DatePickerModalContent';
export interface HeaderPickProps {
    moreLabel?: string;
    label?: string;
    emptyLabel?: string;
    saveLabel?: string;
    headerSeparator?: string;
    startLabel?: string;
    endLabel?: string;
}
export interface HeaderContentProps extends HeaderPickProps {
    state: LocalState;
    mode: ModeType;
    collapsed: boolean;
    onToggle: () => any;
    locale: string | undefined;
}
export default function DatePickerModalContentHeader(props: HeaderContentProps): JSX.Element;
export declare function HeaderContentSingle({ state, emptyLabel, color, locale, }: HeaderContentProps & {
    color: string;
}): JSX.Element;
export declare function HeaderContentMulti({ state, emptyLabel, moreLabel, color, locale, }: HeaderContentProps & {
    color: string;
    moreLabel: string | undefined;
}): JSX.Element;
export declare function HeaderContentRange({ locale, state, headerSeparator, startLabel, endLabel, color, }: HeaderContentProps & {
    color: string;
}): JSX.Element;
