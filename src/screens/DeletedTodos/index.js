import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Button} from 'react-native-paper';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import PaginationControls from '../../components/PaginationControls';
import SearchForm from '../../components/SearchForm';
import TodoList from '../../components/TodoList';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function DeletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [todoResponse, setTodoResponse] = useState([]);
  const todoSections = useMemo(
    () =>
      groupsToSections(
        groupByDate({
          todos: todoResponse.data,
          attribute: 'deleted-at',
          reverse: true,
        }),
      ),
    [todoResponse],
  );
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({
          filter: {status: 'deleted', search: searchText},
          options: {sort: '-deletedAt', 'page[number]': pageNumber},
        })
        .then(response => {
          setShowLoadingIndicator(false);
          setTodoResponse(response);
          return response;
        })
        .catch(console.error),
    [todoClient, searchText, pageNumber],
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
        ? 'No deleted todos matched your search'
        : "You have no deleted todos. Don't be afraid to give up!";
      return <NoTodosMessage>{noTodosMessage}</NoTodosMessage>;
    } else {
      const maxPageNumber = todoResponse?.meta?.['page-count'];
      return (
        <>
          <PaginationControls
            pageNumber={pageNumber}
            maxPageNumber={maxPageNumber}
            increment={() => setPageNumber(pageNumber + 1)}
            decrement={() => setPageNumber(pageNumber - 1)}
          />
          <TodoList
            testID="deleted-todos"
            sectionListRef={sectionListRef}
            todoSections={todoSections}
            onPressTodo={todo => linkTo(`/todos/deleted/${todo.id}`)}
          />
        </>
      );
    }
  }

  return (
    <>
      <SearchForm value={searchText} onSubmit={setSearchText} />
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </>
  );
}
