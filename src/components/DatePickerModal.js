import {startOfDay} from 'date-fns';
import {DatePickerModal} from 'react-native-paper-dates';

export default function MyDatePickerModal({
  visible,
  date,
  saveLabel,
  onConfirm,
  onDismiss,
}) {
  function handleConfirm({date: dayEnd}) {
    if (dayEnd) {
      const dayStart = startOfDay(dayEnd);
      onConfirm(dayStart);
    } else {
      onConfirm(null);
    }
  }

  return (
    <DatePickerModal
      visible={visible}
      locale="en"
      mode="single"
      saveLabel={saveLabel}
      date={date}
      onConfirm={handleConfirm}
      onDismiss={onDismiss}
    />
  );
}
