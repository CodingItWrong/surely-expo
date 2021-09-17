import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import {useTodos} from '../../data/todos';

const sortedFutureTodos = todos =>
  sortBy(
    filter(
      todos,
      todo => !todo.attributes['deleted-at'] && todo.attributes['completed-at'],
    ),
    [t => t.attributes.name.toLowerCase()],
  );

export default function CompletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedFutureTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'completed'}})
        .then(({data}) => setTodos(data))
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

  return (
    <>
      <Button onPress={reload}>Reload</Button>
      {sortedTodos.length === 0 ? (
        <Text>You have no completed todos. You'll get there!</Text>
      ) : (
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
      )}
    </>
  );
}
