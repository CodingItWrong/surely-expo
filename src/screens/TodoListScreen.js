import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import NewTodoForm from '../components/NewTodoForm';
import NoTodosMessage from '../components/NoTodosMessage';
import SearchForm from '../components/SearchForm';
import TodoList from '../components/TodoList';
import {groupsToSections} from '../utils/ui';

export default function TodoListScreen({
  search,
  onLoadTodos,
  onCreateTodo,
  onPressTodo,
  noTodosMessage,
  noSearchResultsMessage,
}) {
  const [searchText, setSearchText] = useState('');
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todoSections, setTodoSections] = useState([]);
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      onLoadTodos({searchText})
        .then(todoGroups => {
          setShowLoadingIndicator(false);
          setTodoSections(groupsToSections(todoGroups));
          return todoGroups;
        })
        .catch(console.error),
    [onLoadTodos, searchText],
  );

  useFocusEffect(
    useCallback(() => {
      loadFromServer();
    }, [loadFromServer]),
  );

  const handleCreate = newTodoName =>
    onCreateTodo(newTodoName).then(loadFromServer).catch(console.error);

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
      const message = searchText ? noSearchResultsMessage : noTodosMessage;
      return <NoTodosMessage>{message}</NoTodosMessage>;
    } else {
      return (
        <TodoList
          testID="todo-list"
          sectionListRef={sectionListRef}
          todoSections={todoSections}
          onPressTodo={onPressTodo}
        />
      );
    }
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      {onCreateTodo && <NewTodoForm onCreate={handleCreate} />}
      {search && <SearchForm value={searchText} onSubmit={setSearchText} />}
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
