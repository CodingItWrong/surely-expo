import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import {useTodos} from '../../data/todos';

const sortedDeletedTodos = todos =>
  reverse(
    sortBy(
      filter(todos, todo => todo.attributes['deleted-at']),
      [t => t.attributes['deleted-at']],
    ),
  );

export default function DeletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todos, setTodos] = useState([]);
  const sortedTodos = useMemo(() => sortedDeletedTodos(todos), [todos]);
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'deleted'}})
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
      return <LoadingIndicator />;
    } else if (sortedTodos.length === 0) {
      return (
        <NoTodosMessage>
          You have no deleted todos. Don't be afraid to give up!
        </NoTodosMessage>
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
