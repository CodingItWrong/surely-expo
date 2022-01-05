import startOfDay from 'date-fns/startOfDay';
import {DatePickerModal} from 'react-native-paper-dates';

export default function MyDatePickerModal({
  visible,
  date,
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

  // TODO: saveLabel doesn't seem to take effect
  return (
    <DatePickerModal
      visible={visible}
      locale="en"
      mode="single"
      saveLabel="Defer"
      date={date}
      onConfirm={handleConfirm}
      onDismiss={onDismiss}
    />
  );
}
