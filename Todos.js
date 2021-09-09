import React from 'react';
import {List, Title} from 'react-native-paper';
import store from './store';
import useOrbitQuery from './useOrbitQuery';

// const query = q =>
//   q.findRecords('todo').filter({attribute: 'status', value: 'available'});

const query = q => q.findRecords('todo');

export default function Todos() {
  const todos = useOrbitQuery({store, query});

  return (
    <>
      <Title>Todos</Title>
      {todos.map(todo => (
        <List.Item
          key={todo.id}
          title={todo.attributes.name}
          left={props => <List.Icon {...props} icon="checkbox-blank-outline" />}
        />
      ))}
    </>
  );
}
