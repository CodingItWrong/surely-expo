import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
import NewTodoForm from '../../components/NewTodoForm';
import {useTodos} from '../../data/todos';

const today = now => startOfDay(new Date());
const tomorrow = now => addDays(today(now), 1);

const sortedTomorrowTodos = todos =>
  sortBy(
    filter(todos, todo => {
      const deferredUntil = new Date(todo.attributes['deferred-until']);
      const date = new Date();
      return (
        !todo.attributes['deleted-at'] &&
        !todo.attributes['completed-at'] &&
        deferredUntil > today(date) &&
        deferredUntil <= tomorrow(date)
      );
    }),
    [t => t.attributes.name.toLowerCase()],
  );

export default function AvailableTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedTomorrowTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'tomorrow'}})
        .then(({data}) => setTodos(data))
        .then(() => setIsInitialLoadComplete(true))
        .catch(console.error),
    [todoClient],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  async function reload() {
    await loadFromServer();
    flatListRef.current.scrollToOffset({offset: 0});
  }

  const handleCreate = name =>
    todoClient
      .create({attributes: {name, 'deferred-until': tomorrow(new Date())}})
      .then(({data}) => setTodos([...todos, data]))
      .catch(console.error);

  function contents() {
    if (!isInitialLoadComplete) {
      return <ActivityIndicator size="large" />;
    } else if (sortedTodos.length === 0) {
      return <Text>You have no todos for tomorrow. Nice work!</Text>;
    } else {
      return (
        <FlatList
          ref={flatListRef}
          data={sortedTodos}
          keyExtractor={todo => todo.id}
          renderItem={({item: todo}) => (
            <List.Item
              key={todo.id}
              title={todo.attributes.name}
              titleNumberOfLines={4}
              onPress={() => linkTo(`/todos/tomorrow/${todo.id}`)}
            />
          )}
        />
      );
    }
  }

  return (
    <>
      <NewTodoForm onCreate={handleCreate} />
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </>
  );
}
