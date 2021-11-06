import * as React from 'react'
import {
  View,
  StyleSheet,
  TextInput as TextInputNative,
  Keyboard,
} from 'react-native'

import type { ModeType, ValidRangeType } from './Calendar'
import type { LocalState } from './DatePickerModalContent'

import DatePickerInput from './DatePickerInput'

function CalendarEdit({
  mode,
  state,
  label = '',
  startLabel = 'Start',
  endLabel = 'End',
  collapsed,
  onChange,
  validRange,
  locale,
}: {
  mode: ModeType
  label?: string
  startLabel?: string
  endLabel?: string
  state: LocalState
  collapsed: boolean
  onChange: (s: LocalState) => any
  validRange: ValidRangeType | undefined
  locale: string
}) {
  const dateInput = React.useRef<TextInputNative | null>(null)
  const startInput = React.useRef<TextInputNative | null>(null)
  const endInput = React.useRef<TextInputNative | null>(null)

  // when switching views focus, or un-focus text input
  React.useEffect(() => {
    // hide open keyboard
    if (collapsed) {
      Keyboard.dismiss()
    }

    const inputsToFocus = [dateInput.current, startInput.current].filter(
      (n) => n
    ) as TextInputNative[]

    const inputsToBlur = [
      dateInput.current,
      startInput.current,
      endInput.current,
    ].filter((n) => n) as TextInputNative[]

    if (collapsed) {
      inputsToBlur.forEach((ip) => ip.blur())
    } else {
      inputsToFocus.forEach((ip) => ip.focus())
    }
  }, [mode, startInput, endInput, dateInput, collapsed])

  const onSubmitStartInput = React.useCallback(() => {
    if (endInput.current) {
      endInput.current.focus()
    }
  }, [endInput])

  const onSubmitEndInput = React.useCallback(() => {
    // TODO: close modal and persist range
  }, [])

  const onSubmitInput = React.useCallback(() => {
    // TODO: close modal and persist range
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        {mode === 'single' ? (
          <DatePickerInput
            inputMode="start"
            ref={dateInput}
            label={label}
            value={state.date}
            onChange={(date) => onChange({ ...state, date })}
            onSubmitEditing={onSubmitInput}
            validRange={validRange}
            locale={locale}
            withModal={false}
            autoCompleteType={'off'}
          />
        ) : null}
        {mode === 'range' ? (
          <>
            <DatePickerInput
              inputMode="start"
              ref={startInput}
              label={startLabel}
              value={state.startDate}
              onChange={(startDate) => onChange({ ...state, startDate })}
              returnKeyType={'next'}
              onSubmitEditing={onSubmitStartInput}
              validRange={validRange}
              locale={locale}
              withModal={false}
              autoCompleteType={'off'}
            />
            <View style={styles.separator} />
            <DatePickerInput
              inputMode="end"
              ref={endInput}
              label={endLabel}
              value={state.endDate}
              onChange={(endDate) => onChange({ ...state, endDate })}
              onSubmitEditing={onSubmitEndInput}
              validRange={validRange}
              locale={locale}
              withModal={false}
              autoCompleteType={'off'}
            />
          </>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { padding: 12 },
  inner: { flexDirection: 'row' },
  inputContainer: { flex: 1 },
  input: { flex: 1 },
  separator: { width: 12 },
})

export default React.memo(CalendarEdit)
