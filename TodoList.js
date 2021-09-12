import {useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import NewTodoForm from './NewTodoForm';
import {useTodos} from './todos';

const sortedAvailableTodos = todos =>
  sortBy(
    filter(
      todos,
      todo =>
        !todo.attributes['deleted-at'] &&
        !todo.attributes['completed-at'] &&
        !(todo.attributes['deferred-until'] > new Date()),
    ),
    [t => t.attributes.name.toLowerCase()],
  );

export default function TodoList() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'available'}})
        .then(response => setTodos(response.data))
        .catch(console.error),
    [todoClient],
  );

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  const handleCreate = name =>
    todoClient
      .create({attributes: {name}})
      .then(response => setTodos([...todos, response.data]))
      .catch(console.error);

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
