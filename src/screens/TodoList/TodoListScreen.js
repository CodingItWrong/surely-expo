import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/LoadingIndicator';
import NewTodoForm from '../../components/NewTodoForm';
import NoTodosMessage from '../../components/NoTodosMessage';
import PaginationControls from '../../components/PaginationControls';
import SearchForm from '../../components/SearchForm';
import TodoList from '../../components/TodoList';
import {groupsToSections} from '../../utils/ui';

export default function TodoListScreen({
  search,
  paginate,
  onLoadTodos,
  onCreateTodo,
  onPressTodo,
  noTodosMessage,
  noSearchResultsMessage,
}) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todoSections, setTodoSections] = useState([]);
  const sectionListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadFromServer = useCallback(
    () =>
      onLoadTodos({searchText, pageNumber})
        .then(({todoGroups, maxPageNumber: newMaxPageNumber}) => {
          setShowLoadingIndicator(false);
          setMaxPageNumber(newMaxPageNumber);
          setTodoSections(groupsToSections(todoGroups));
          return todoGroups;
        })
        .catch(console.error),
    [onLoadTodos, searchText, pageNumber],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  const handleCreate = newTodoName =>
    onCreateTodo(newTodoName).then(loadFromServer).catch(console.error);

  async function reloadFromPull() {
    setIsRefreshing(true);
    await loadFromServer();
    setIsRefreshing(false);
  }

  async function reloadFromButton() {
    setShowLoadingIndicator(true);
    const todoGroups = await loadFromServer();
    if (todoGroups.length > 0) {
      sectionListRef.current.scrollToLocation({sectionIndex: 0, itemIndex: 0});
    }
  }

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      const message = searchText ? noSearchResultsMessage : noTodosMessage;
      return <NoTodosMessage>{message}</NoTodosMessage>;
    } else {
      return (
        <>
          {paginate && (
            <PaginationControls
              pageNumber={pageNumber}
              maxPageNumber={maxPageNumber}
              increment={() => setPageNumber(pageNumber + 1)}
              decrement={() => setPageNumber(pageNumber - 1)}
            />
          )}
          <TodoList
            testID="todo-list"
            sectionListRef={sectionListRef}
            todoSections={todoSections}
            onPressTodo={onPressTodo}
            onRefresh={reloadFromPull}
            refreshing={isRefreshing}
            contentContainerStyle={{paddingBottom: insets.bottom}}
          />
        </>
      );
    }
  }

  return (
    <View style={styles.container}>
      {onCreateTodo && <NewTodoForm onCreate={handleCreate} />}
      {search && <SearchForm value={searchText} onSubmit={setSearchText} />}
      {Platform.OS === 'web' && (
        <Button onPress={reloadFromButton}>Reload</Button>
      )}
      {contents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
