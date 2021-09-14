import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import startOfDay from 'date-fns/startOfDay';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import {useTodos} from '../../data/todos';

const sortedFutureTodos = todos =>
  sortBy(
    filter(todos, todo => {
      const deferredUntil = new Date(todo.attributes['deferred-until']);
      const today = startOfDay(new Date());
      return (
        !todo.attributes['deleted-at'] &&
        !todo.attributes['completed-at'] &&
        deferredUntil > today
      );
    }),
    [t => t.attributes.name.toLowerCase()],
  );

export default function FutureTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedFutureTodos(todos), [todos]);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'future'}})
        .then(({data}) => setTodos(data))
        .catch(console.error),
    [todoClient],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  return (
    <>
      <Button onPress={loadFromServer}>Reload</Button>
      <FlatList
        data={sortedTodos}
        keyExtractor={todo => todo.id}
        renderItem={({item: todo}) => (
          <List.Item
            key={todo.id}
            title={todo.attributes.name}
            titleNumberOfLines={4}
            onPress={() => linkTo(`/todos/future/${todo.id}`)}
          />
        )}
      />
    </>
  );
}
