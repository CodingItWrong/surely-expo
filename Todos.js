import sortBy from 'lodash/sortBy';
import React from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import NewTodoForm from './NewTodoForm';
import {useStore} from './store';
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
  const store = useStore();
  const todos = useOrbitQuery({query});
  const sortedTodos = sortBy(todos, [t => t.attributes.name.toLowerCase()]);

  const handleCreate = name =>
    store.update(t =>
      t.addRecord({
        type: 'todo',
        attributes: {name},
      }),
    );

  const handleComplete = todo =>
    store.update(t =>
      t.updateRecord({
        type: 'todo',
        id: todo.id,
        attributes: {completedAt: new Date()},
      }),
    );

  return (
    <>
      <NewTodoForm onCreate={handleCreate} />
      <FlatList
        data={sortedTodos}
        keyExtractor={todo => todo.id}
        renderItem={({item: todo}) => (
          <List.Item
            key={todo.id}
            title={todo.attributes.name}
            onPress={() => handleComplete(todo)}
          />
        )}
      />
    </>
  );
}
