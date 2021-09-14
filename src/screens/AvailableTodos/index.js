import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import NewTodoForm from '../../components/NewTodoForm';
import {useTodos} from '../../data/todos';

const sortedAvailableTodos = todos =>
  sortBy(
    filter(
      todos,
      todo =>
        !todo.attributes['deleted-at'] &&
        !todo.attributes['completed-at'] &&
        !(new Date(todo.attributes['deferred-until']) > new Date()),
    ),
    [t => t.attributes.name.toLowerCase()],
  );

export default function AvailableTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'available'}})
        .then(({data}) => setTodos(data))
        .catch(console.error),
    [todoClient],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  const handleCreate = name =>
    todoClient
      .create({attributes: {name}})
      .then(({data}) => setTodos([...todos, data]))
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
            onPress={() => linkTo(`/todos/available/${todo.id}`)}
          />
        )}
      />
    </>
  );
}
