import type { TranslationsType } from './utils'

const en: TranslationsType = {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat: string) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: 'Must be later then',
  mustBeLowerThan: 'Must be earlier then',
  mustBeBetween: 'Must be between',
  dateIsDisabled: 'Day is not allowed',
}
export default en
