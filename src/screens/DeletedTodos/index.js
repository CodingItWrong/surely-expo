import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList} from 'react-native';
import {Button, List} from 'react-native-paper';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoTodosMessage from '../../components/NoTodosMessage';
import {useTodos} from '../../data/todos';
import {groupByDate} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function DeletedTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todos, setTodos] = useState([]);
  const todoSections = useMemo(
    () =>
      groupsToSections(
        groupByDate({todos, attribute: 'deleted-at', reverse: true}),
      ),
    [todos],
  );
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'deleted'}})
        .then(response => {
          setShowLoadingIndicator(false);
          setTodos(response.data);
          return response;
        })
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
    const response = await loadFromServer();
    if (response.data.length > 0) {
      sectionListRef.current.scrollToLocation({sectionIndex: 0, itemIndex: 0});
    }
  }

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      return (
        <NoTodosMessage>
          You have no deleted todos. Don't be afraid to give up!
        </NoTodosMessage>
      );
    } else {
      return (
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
