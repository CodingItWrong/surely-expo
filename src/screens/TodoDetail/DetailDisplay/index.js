import React from 'react';
import {IconButton, Text, Title} from 'react-native-paper';
import Actions from './Actions';
import EventLog from './EventLog';

export default function DetailDisplay({todo, onEdit, onUpdate, onGoBack}) {
  return (
    <>
      <IconButton icon="pencil" accessibilityLabel="Edit" onPress={onEdit} />
      <Title>{todo.attributes.name}</Title>
      {todo.attributes.notes ? <Text>{todo.attributes.notes}</Text> : null}
      <EventLog todo={todo} />
      <Actions todo={todo} onUpdate={onUpdate} onGoBack={onGoBack} />
    </>
  );
}
