import {useLinkTo} from '@react-navigation/native';
import axios from 'axios';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import NewTodoForm from './NewTodoForm';
import baseUrl from './baseUrl';
import {useToken} from './token';

const client = axios.create({baseURL: baseUrl});

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
  const {token} = useToken();
  const Authorization = useMemo(() => `Bearer ${token}`, [token]);
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  const loadFromServer = useCallback(() => {
    client
      .get('/todos?filter[status]=available', {headers: {Authorization}})
      .then(response => setTodos(response.data.data))
      .catch(console.error);
  }, [Authorization]);

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  const handleCreate = name =>
    client
      .post(
        '/todos',
        {
          data: {
            type: 'todos',
            attributes: {name},
          },
        },
        {headers: {Authorization, 'Content-Type': 'application/vnd.api+json'}},
      )
      .then(response => setTodos([...todos, response.data.data]))
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
