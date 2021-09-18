import {useFocusEffect, useLinkTo} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SectionList} from 'react-native';
import {ActivityIndicator, Button, List, Text} from 'react-native-paper';
import NewTodoForm from '../../components/NewTodoForm';
import {useTodos} from '../../data/todos';
import {groupByCategory} from '../../utils/grouping';

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
  const flatListRef = useRef(null);

  const loadFromServer = useCallback(
    () =>
      todoClient
        .where({filter: {status: 'available'}, options: {include: 'category'}})
        .then(response => setTodoResponse(response))
        .then(() => setShowLoadingIndicator(false))
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
    await loadFromServer();
    // flatListRef.current.scrollToOffset({offset: 0});
  }

  const handleCreate = name =>
    todoClient
      .create({attributes: {name}})
      .then(loadFromServer)
      .catch(console.error);

  function contents() {
    if (showLoadingIndicator) {
      return <ActivityIndicator size="large" />;
    } else if (todoSections.length === 0) {
      return <Text>You have no available todos. Nice work!</Text>;
    } else {
      return (
        <SectionList
          ref={flatListRef}
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
    <>
      <NewTodoForm onCreate={handleCreate} />
      <Button onPress={reload}>Reload</Button>
      {contents()}
    </>
  );
}
