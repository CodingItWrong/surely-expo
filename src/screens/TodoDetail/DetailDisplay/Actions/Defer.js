import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {breakpointMedium} from '../../../../breakpoints';
import DatePickerModal from '../../../../components/DatePickerModal';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useTodos} from '../../../../data/todos';
import sharedStyles from '../../../../sharedStyles';
import {dayOfWeek, deferDate} from '../../../../utils/time';

export default function Defer({todo, onUpdate, onCancel, onComplete}) {
  const [isDeferredUntilModalOpen, setIsDeferredUntilModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {id} = todo;
  const deferredUntil = todo.attributes['deferred-until'];
  const todoClient = useTodos();

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  async function handleDeferUntil(date) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await updateAttributes({'deferred-until': date});
      handleResponse(response);
      setIsDeferredUntilModalOpen(false);
      onComplete();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred deferring the todo.');
      console.error(error);
    }
  }

  return (
    <>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <View style={styles.buttonColumnWrapper}>
        <View style={styles.buttonColumn}>
          <Button
            testID="cancel-defer-button"
            mode="outlined"
            onPress={onCancel}
            style={sharedStyles.buttonSpacing}
            disabled={isLoading}
            accessibilityLabel="Cancel"
          >
            Cancel
          </Button>
          <DeferButton
            testID="defer-1-day-button"
            todo={todo}
            numDays={1}
            label="1 Day"
            onDefer={handleDeferUntil}
            disabled={isLoading}
          />
          <DeferButton
            testID="defer-2-days-button"
            todo={todo}
            numDays={2}
            label="2 Days"
            onDefer={handleDeferUntil}
            disabled={isLoading}
          />
          <DeferButton
            testID="defer-3-days-button"
            todo={todo}
            numDays={3}
            label="3 Days"
            onDefer={handleDeferUntil}
            disabled={isLoading}
          />
          <DeferButton
            testID="defer-1-week-button"
            todo={todo}
            numDays={7}
            label="1 Week"
            onDefer={handleDeferUntil}
            disabled={isLoading}
          />
          <Button
            mode="outlined"
            onPress={() => setIsDeferredUntilModalOpen(true)}
            style={sharedStyles.buttonSpacing}
            disabled={isLoading}
            accessibilityLabel="Pick Date"
          >
            Pick Date
          </Button>
        </View>
      </View>
      <DatePickerModal
        visible={isDeferredUntilModalOpen}
        date={deferredUntil ? new Date(deferredUntil) : null}
        saveLabel="Defer"
        onConfirm={dayEnd => handleDeferUntil(dayEnd)}
        onDismiss={() => setIsDeferredUntilModalOpen(false)}
      />
    </>
  );
}

function DeferButton({testID, todo, numDays, label, onDefer, disabled}) {
  const date = deferDate({
    start: todo.attributes['deferred-until'],
    days: numDays,
  });
  return (
    <Button
      testID={testID}
      mode="outlined"
      onPress={() => onDefer(date)}
      style={sharedStyles.buttonSpacing}
      disabled={disabled}
      accessibilityLabel={label}
    >
      {label} - {dayOfWeek(date)}
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonColumnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonColumn: {
    flex: 1,
    maxWidth: breakpointMedium,
  },
});
