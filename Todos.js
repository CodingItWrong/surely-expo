import {useLinkTo} from '@react-navigation/native';
import sortBy from 'lodash/sortBy';
import React from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import useOrbitQuery from './useOrbitQuery';

// todos that are not completed and not deleted
const query = q =>
  q
    .findRecords('todo')
    .filter(
      {attribute: 'completedAt', value: null},
      {attribute: 'deletedAt', value: null},
    );

export default function Todos() {
  const todos = useOrbitQuery({query});
  const sortedTodos = sortBy(todos, [t => t.attributes.name.toLowerCase()]);
  const linkTo = useLinkTo();

  return (
    <FlatList
      data={sortedTodos}
      keyExtractor={todo => todo.id}
      renderItem={({item: todo}) => (
        <List.Item
          key={todo.id}
          title={todo.attributes.name}
          onPress={() => linkTo(`/todos/${todo.id}`)}
        />
      )}
    />
  );
}
