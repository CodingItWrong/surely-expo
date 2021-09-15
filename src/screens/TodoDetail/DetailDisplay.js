import React from 'react';
import {Text, Title} from 'react-native-paper';

export default function DetailDisplay({todo}) {
  return (
    <>
      <Title>{todo.attributes.name}</Title>
      {todo.attributes.notes ? <Text>{todo.attributes.notes}</Text> : null}
    </>
  );
}
