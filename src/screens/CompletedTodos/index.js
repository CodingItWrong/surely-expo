import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList} from 'react-native';
import {Button, List} from 'react-native-paper';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import PaginationControls from '../../components/PaginationControls';
import SearchForm from '../../components/SearchForm';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function CompletedTodos() {
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
          attribute: 'completed-at',
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
          filter: {status: 'completed', search: searchText},
          options: {sort: '-completedAt', 'page[number]': pageNumber},
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
        ? 'No completed todos matched your search'
        : "You have no completed todos. You'll get there!";
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
          <SectionList
            testID="completed-todos"
            ref={sectionListRef}
            sections={todoSections}
            keyExtractor={todo => todo.id}
            renderSectionHeader={({section}) => (
              <List.Subheader>
                {section.title} ({section.data.length})
              </List.Subheader>
            )}
            renderItem={({item: todo}) => (
              <List.Item
                key={todo.id}
                title={todo.attributes.name}
                titleNumberOfLines={4}
                onPress={() => linkTo(`/todos/completed/${todo.id}`)}
              />
            )}
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
