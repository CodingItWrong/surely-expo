import {useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
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
  const linkTo = useLinkTo();
  const store = useStore();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  const loadFromServer = useCallback(() => store.query(serverQuery), [store]);

  useEffect(() => {
    store.on('transform', () => {
      setTodos(store.cache.query(clientQuery));
    });
    loadFromServer();
  }, [loadFromServer, store]);

  const handleCreate = name =>
    store.update(t =>
      t.addRecord({
        type: 'todo',
        attributes: {name},
      }),
    );

  return (
    <>
      <NewTodoForm onCreate={handleCreate} />
      <Button onPress={loadFromServer}>Reload</Button>
      <FlatList
        data={sortedTodos}
        keyExtractor={todo => todo.id}
        renderItem={({item: todo}) => (
          <List.Item
            key={todo.id}
            title={todo.attributes.name}
            titleNumberOfLines={4}
            onPress={() => linkTo(`/todos/${todo.id}`)}
          />
        )}
      />
    </>
  );
}
