import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {Button, IconButton, List, Text} from 'react-native-paper';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function CompletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
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
  const maxPageNumber = todoResponse?.meta?.['page-count'];

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({
          filter: {status: 'completed'},
          options: {sort: '-completedAt', 'page[number]': pageNumber},
        })
        .then(response => {
          setShowLoadingIndicator(false);
          setTodoResponse(response);
          return response;
        })
        .catch(console.error),
    [todoClient, pageNumber],
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

  const pageNumberAtMin = pageNumber <= 1;
  const pageNumberAtMax = pageNumber >= maxPageNumber;

  function decrementPageNumber() {
    if (!pageNumberAtMin) {
      setPageNumber(pageNumber - 1);
    }
  }

  function incrementPageNumber() {
    if (!pageNumberAtMax) {
      setPageNumber(pageNumber + 1);
    }
  }

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      return (
        <NoTodosMessage>
          You have no completed todos. You'll get there!
        </NoTodosMessage>
      );
    } else {
      return (
        <>
          <View style={styles.paginationControls}>
            <IconButton
              icon="arrow-left-bold"
              disabled={pageNumberAtMin}
              onPress={decrementPageNumber}
              accessibilityLabel="Go to previous page"
            />
            <Text>
              Page {pageNumber} of {maxPageNumber}
            </Text>
            <IconButton
              icon="arrow-right-bold"
              disabled={pageNumberAtMax}
              onPress={incrementPageNumber}
              accessibilityLabel="Go to next page"
            />
          </View>
          <SectionList
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
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </>
  );
}

const styles = StyleSheet.create({
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
