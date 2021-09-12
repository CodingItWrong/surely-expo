import {useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import NewTodoForm from './NewTodoForm';
import api from './api';
import {useToken} from './token';

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

export default function TodoList() {
  const {token} = useToken();
  const config = useMemo(
    () => ({headers: {Authorization: `Bearer ${token}`}}),
    [token],
  );
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  const loadFromServer = useCallback(() => {
    api
      .get('/todos?filter[status]=available', config)
      .then(response => setTodos(response.data))
      .catch(console.error);
  }, [config]);

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  const handleCreate = name =>
    api
      .post(
        '/todos',
        {
          data: {
            type: 'todos',
            attributes: {name},
          },
        },
        config,
      )
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
