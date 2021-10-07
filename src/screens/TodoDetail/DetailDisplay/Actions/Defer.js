import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
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
      <Button
        testID="cancel-defer-button"
        mode="outlined"
        onPress={onCancel}
        style={sharedStyles.buttonSpacing}
        disabled={isLoading}
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
      >
        Pick Date
      </Button>
      <DatePickerModal
        visible={isDeferredUntilModalOpen}
        mode="single"
        saveLabel="Defer"
        date={deferredUntil ? new Date(deferredUntil) : null}
        onConfirm={({date}) => handleDeferUntil(date)}
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
    >
      {label} - {dayOfWeek(date)}
    </Button>
  );
}
