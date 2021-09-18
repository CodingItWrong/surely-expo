import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import startOfDay from 'date-fns/startOfDay';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
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
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedFutureTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'future'}})
        .then(({data}) => setTodos(data))
        .then(() => setShowLoadingIndicator(false))
        .catch(console.error),
    [todoClient],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  async function reload() {
    setShowLoadingIndicator(true);
    await loadFromServer();
    flatListRef.current.scrollToOffset({offset: 0});
  }

  function contents() {
    if (showLoadingIndicator) {
      return <ActivityIndicator size="large" />;
    } else if (sortedTodos.length === 0) {
      return <Text>You have no future todos. Nice work!</Text>;
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
              onPress={() => linkTo(`/todos/future/${todo.id}`)}
            />
          )}
        />
      );
    }
  }

  return (
    <>
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </>
  );
}
