import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import NewTodoForm from '../components/NewTodoForm';
import NoTodosMessage from '../components/NoTodosMessage';
import TodoList from '../components/TodoList';
import {groupByCategory} from '../utils/grouping';
import {groupsToSections} from '../utils/ui';

export default function TodoListScreen({
  onLoadTodos,
  onCreateTodo,
  onPressTodo,
  noTodosMessage,
}) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todoResponse, setTodoResponse] = useState([]);
  const todoSections = useMemo(
    () => groupsToSections(groupByCategory(todoResponse)),
    [todoResponse],
  );
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      onLoadTodos()
        .then(response => {
          setShowLoadingIndicator(false);
          setTodoResponse(response);
          return response;
        })
        .catch(console.error),
    [onLoadTodos],
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
      return <NoTodosMessage>{noTodosMessage}</NoTodosMessage>;
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
      <NewTodoForm onCreate={handleCreate} />
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
