import React from 'react';
import {Text} from 'react-native';
import store from './store';
import useOrbitQuery from './useOrbitQuery';

// const query = q =>
//   q.findRecords('todo').filter({attribute: 'status', value: 'available'});

const query = q => q.findRecords('todo');

export default function Todos() {
  const todos = useOrbitQuery({store, query});

  return (
    <>
      <Text>Todos</Text>
      {todos.map(todo => (
        <Text key={todo.id}>{todo.attributes.name}</Text>
      ))}
    </>
  );
}
