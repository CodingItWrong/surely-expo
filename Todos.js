import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import NewTodoForm from './NewTodoForm';
import {useStore} from './store';

const serverQuery = q =>
  q.findRecords('todo').filter({attribute: 'status', value: 'available'});

const clientQuery = q => q.findRecords('todo');

const sortedAvailableTodos = todos =>
  sortBy(
    filter(
      todos,
      todo =>
        !todo.attributes.deletedAt &&
        !todo.attributes.completedAt &&
        !(todo.attributes.deferredUntil > new Date()),
    ),
    [t => t.attributes.name.toLowerCase()],
  );

export default function Todos() {
  const store = useStore();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  useEffect(() => {
    store.on('transform', () => {
      setTodos(store.cache.query(clientQuery));
    });
    store.query(serverQuery);
  }, [store]);

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
