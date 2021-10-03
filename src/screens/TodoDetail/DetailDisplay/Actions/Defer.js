import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {useTodos} from '../../../../data/todos';
import sharedStyles from '../../../../sharedStyles';
import {dayOfWeek, deferDate} from '../../../../utils/time';

export default function Defer({todo, onUpdate, onCancel, onComplete}) {
  const [isDeferredUntilModalOpen, setIsDeferredUntilModalOpen] =
    useState(false);

  const {id} = todo;
  const deferredUntil = todo.attributes['deferred-until'];
  const todoClient = useTodos();

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  const handleDeferUntil = date => {
    console.log({date});
    return updateAttributes({'deferred-until': date})
      .then(handleResponse)
      .then(() => setIsDeferredUntilModalOpen(false))
      .then(onComplete)
      .catch(console.error);
  };

  return (
    <>
      <Button
        testID="cancel-defer-button"
        mode="outlined"
        onPress={onCancel}
        style={sharedStyles.button}
      >
        Cancel
      </Button>
      <DeferButton
        testID="defer-1-day-button"
        todo={todo}
        numDays={1}
        label="1 Day"
        onDefer={handleDeferUntil}
      />
      <DeferButton
        testID="defer-2-days-button"
        todo={todo}
        numDays={2}
        label="2 Days"
        onDefer={handleDeferUntil}
      />
      <DeferButton
        testID="defer-3-days-button"
        todo={todo}
        numDays={3}
        label="3 Days"
        onDefer={handleDeferUntil}
      />
      <DeferButton
        testID="defer-1-week-button"
        todo={todo}
        numDays={7}
        label="1 Week"
        onDefer={handleDeferUntil}
      />
      <Button
        mode="outlined"
        onPress={() => setIsDeferredUntilModalOpen(true)}
        style={sharedStyles.button}
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

function DeferButton({testID, todo, numDays, label, onDefer}) {
  const date = deferDate({
    start: todo.attributes['deferred-until'],
    days: numDays,
  });
  return (
    <Button
      testID={testID}
      mode="outlined"
      onPress={() => onDefer(date)}
      style={sharedStyles.button}
    >
      {label} - {dayOfWeek(date)}
    </Button>
  );
}
