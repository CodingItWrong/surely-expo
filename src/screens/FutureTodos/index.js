import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import SearchForm from '../../components/SearchForm';
import TodoList from '../../components/TodoList';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function FutureTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [todos, setTodos] = useState([]);
  const todoSections = useMemo(
    () => groupsToSections(groupByDate({todos, attribute: 'deferred-until'})),
    [todos],
  );
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({
          filter: {status: 'future', search: searchText},
          options: {sort: 'name'},
        })
        .then(response => {
          setShowLoadingIndicator(false);
          setTodos(response.data);
          return response;
        })
        .catch(console.error),
    [todoClient, searchText],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  async function reload() {
    setShowLoadingIndicator(true);
    const response = await loadFromServer();
    if (response.data.length > 0) {
      sectionListRef.current.scrollToLocation({sectionIndex: 0, itemIndex: 0});
    }
  }

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      const noTodosMessage = searchText
        ? 'No future todos matched your search'
        : 'You have no future todos. Nice work!';
      return <NoTodosMessage>{noTodosMessage}</NoTodosMessage>;
    } else {
      return (
        <TodoList
          testID="future-todos"
          sectionListRef={sectionListRef}
          todoSections={todoSections}
          onPressTodo={todo => linkTo(`/todos/future/${todo.id}`)}
        />
      );
    }
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <SearchForm value={searchText} onSubmit={setSearchText} />
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
