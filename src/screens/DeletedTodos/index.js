import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
import {useTodos} from '../../data/todos';

const sortedFutureTodos = todos =>
  sortBy(
    filter(todos, todo => todo.attributes['deleted-at']),
    [t => t.attributes.name.toLowerCase()],
  );

export default function DeletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedFutureTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'deleted'}})
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

  function contents() {
    if (!isInitialLoadComplete) {
      return <ActivityIndicator size="large" />;
    } else if (sortedTodos.length === 0) {
      return (
        <Text>You have no deleted todos. Don't be afraid to give up!</Text>
      );
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
              onPress={() => linkTo(`/todos/deleted/${todo.id}`)}
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
