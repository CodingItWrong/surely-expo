import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Button, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/LoadingIndicator';
import NewTodoForm from '../../components/NewTodoForm';
import NoTodosMessage from '../../components/NoTodosMessage';
import {useTodos} from '../../data/todos';
import {groupByCategory} from '../../utils/grouping';
import {groupsToSections} from '../../utils/ui';

export default function AvailableTodos() {
  const todoClient = useTodos();
  const linkTo = useLinkTo();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [todoResponse, setTodoResponse] = useState([]);
  const todoSections = useMemo(
    () => groupsToSections(groupByCategory(todoResponse)),
    [todoResponse],
  );
  const sectionListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'available'}, options: {include: 'category'}})
        .then(response => {
          setShowLoadingIndicator(false);
          setTodoResponse(response);
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

  const handleCreate = name =>
    todoClient
      .create({attributes: {name}})
      .then(loadFromServer)
      .catch(console.error);

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      return (
        <NoTodosMessage>You have no available todos. Nice work!</NoTodosMessage>
      );
    } else {
      return (
        <SectionList
          testID="available-todos"
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
              onPress={() => linkTo(`/todos/available/${todo.id}`)}
            />
          )}
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
