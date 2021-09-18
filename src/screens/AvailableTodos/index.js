import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
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
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedAvailableTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'available'}})
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
      .create({attributes: {name}})
      .then(({data}) => setTodos([...todos, data]))
      .catch(console.error);

  function contents() {
    if (!isInitialLoadComplete) {
      return <ActivityIndicator size="large" />;
    } else if (sortedTodos.length === 0) {
      return <Text>You have no available todos. Nice work!</Text>;
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
              onPress={() => linkTo(`/todos/available/${todo.id}`)}
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
