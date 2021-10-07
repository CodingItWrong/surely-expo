import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/LoadingIndicator';
import NewTodoForm from '../../components/NewTodoForm';
import PaginationControls from '../../components/PaginationControls';
import SearchForm from '../../components/SearchForm';
import TodoList from '../../components/TodoList';
import {groupsToSections} from '../../utils/ui';

function TodoListScreen({
  search,
  paginate,
  onLoadTodos,
  onCreateTodo,
  onPressTodo,
  noTodosMessage,
  noSearchResultsMessage,
  theme,
}) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todoSections, setTodoSections] = useState([]);
  const sectionListRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const containerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  const loadFromServer = useCallback(async () => {
    setErrorMessage(null);
    try {
      const {todoGroups, maxPageNumber: newMaxPageNumber} = await onLoadTodos({
        searchText,
        pageNumber,
      });
      setMaxPageNumber(newMaxPageNumber);
      setTodoSections(groupsToSections(todoGroups));
      return todoGroups;
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while loading todos.');
    }
  }, [onLoadTodos, searchText, pageNumber]);

  useFocusEffect(
    useCallback(() => {
      loadFromServer().then(() => {
        setShowLoadingIndicator(false);
      });
    }, [loadFromServer]),
  );

  async function reloadFromPull() {
    setIsRefreshing(true);
    await loadFromServer();
    setIsRefreshing(false);
  }

  async function reloadFromButton() {
    setShowLoadingIndicator(true);
    const todoGroups = await loadFromServer();
    setShowLoadingIndicator(false);
    if (todoGroups.length > 0) {
      sectionListRef.current.scrollToLocation({sectionIndex: 0, itemIndex: 0});
    }
  }

  async function handleCreate(newTodoName) {
    setErrorMessage(null);
    setIsCreating(true);
    try {
      await onCreateTodo(newTodoName);
    } catch (error) {
      setErrorMessage(
        'An error occurred while creating the todo. Please try again.',
      );
      setIsCreating(false);
      console.error(error);
      throw error;
    }

    setIsCreating(false);
    return loadFromServer();
  }

  function contents() {
    const message = searchText ? noSearchResultsMessage : noTodosMessage;
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
          noTodosMessage={message}
          errorMessage={errorMessage}
          onPressTodo={onPressTodo}
          onRefresh={reloadFromPull}
          refreshing={isRefreshing}
          contentContainerStyle={{paddingBottom: insets.bottom}}
        />
      </>
    );
  }

  return (
    <View style={containerStyle}>
      {onCreateTodo && (
        <NewTodoForm isCreating={isCreating} onCreate={handleCreate} />
      )}
      {search && <SearchForm value={searchText} onSubmit={setSearchText} />}
      {Platform.OS === 'web' && (
        <Button mode="outlined" onPress={reloadFromButton}>
          Reload
        </Button>
      )}
      {showLoadingIndicator && <LoadingIndicator />}
      {contents()}
    </View>
  );
}

export default withTheme(TodoListScreen);
