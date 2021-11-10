export declare type TranslationsType = {
    selectSingle: string;
    selectMultiple: string;
    selectRange: string;
    save: string;
    notAccordingToDateFormat: (inputFormat: string) => string;
    mustBeHigherThan: string;
    mustBeLowerThan: string;
    mustBeBetween: string;
    dateIsDisabled: string;
    previous: string;
    next: string;
    typeInDate: string;
    pickDateFromCalendar: string;
    close: string;
};
export declare function getTranslation(locale: string | undefined, key: keyof TranslationsType, fallback?: any): any;
export declare function registerTranslation(locale: string, translations: TranslationsType): void;
