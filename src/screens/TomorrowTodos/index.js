import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Button, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingIndicator from '../../components/LoadingIndicator';
import NewTodoForm from '../../components/NewTodoForm';
import NoTodosMessage from '../../components/NoTodosMessage';
import {useTodos} from '../../data/todos';
import {groupByCategory} from '../../utils/grouping';

const today = now => startOfDay(new Date());
const tomorrow = now => addDays(today(now), 1);
const groupsToSections = groups =>
  groups.map(({name, todos}) => ({title: name, data: todos}));

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
        .where({filter: {status: 'tomorrow'}, options: {include: 'category'}})
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
      .create({attributes: {name, 'deferred-until': tomorrow(new Date())}})
      .then(loadFromServer)
      .catch(console.error);

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (todoSections.length === 0) {
      return (
        <NoTodosMessage>
          You have no todos for tomorrow. Nice work!
        </NoTodosMessage>
      );
    } else {
      return (
        <SectionList
          testID="tomorrow-todos"
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
              onPress={() => linkTo(`/todos/tomorrow/${todo.id}`)}
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
