import React from 'react';
import {Button} from 'react-native-paper';
import {useTodos} from '../../../../data/todos';
import {deferDate} from '../../../../utils/time';

export default function Defer({todo, onUpdate, onCancel, onComplete}) {
  const {id} = todo;
  const todoClient = useTodos();

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  const deferDays = date => () =>
    updateAttributes({'deferred-until': date})
      .then(handleResponse)
      .then(onComplete)
      .catch(console.error);

  return (
    <>
      <Button mode="outlined" onPress={onCancel}>
        Cancel
      </Button>
      <DeferButton todo={todo} numDays={1} label="1 Day" onDefer={deferDays} />
      <DeferButton todo={todo} numDays={2} label="2 Days" onDefer={deferDays} />
      <DeferButton todo={todo} numDays={3} label="3 Days" onDefer={deferDays} />
      <DeferButton todo={todo} numDays={7} label="1 Week" onDefer={deferDays} />
    </>
  );
}

function DeferButton({todo, numDays, label, onDefer}) {
  const date = deferDate({
    start: todo.attributes['deferred-until'],
    days: numDays,
  });
  return (
    <Button mode="outlined" onPress={onDefer(date)}>
      {label}
    </Button>
  );
}
