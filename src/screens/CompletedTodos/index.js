import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
import {useTodos} from '../../data/todos';

const sortedCompletedTodos = todos =>
  reverse(
    sortBy(
      filter(
        todos,
        todo =>
          !todo.attributes['deleted-at'] && todo.attributes['completed-at'],
      ),
      [t => t.attributes['completed-at']],
    ),
  );

export default function CompletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedCompletedTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'completed'}})
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
      return <Text>You have no completed todos. You'll get there!</Text>;
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
              onPress={() => linkTo(`/todos/completed/${todo.id}`)}
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
