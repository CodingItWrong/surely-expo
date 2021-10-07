import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import theme from '../theme';
import ErrorMessage from './ErrorMessage';
import NoTodosMessage from './NoTodosMessage';

export default function TodoList({
  testID,
  todoSections,
  noTodosMessage,
  errorMessage,
  sectionListRef,
  onPressTodo,
  onRefresh,
  refreshing,
  contentContainerStyle,
}) {
  function listHeader() {
    if (errorMessage) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (todoSections.length === 0) {
      return <NoTodosMessage>{noTodosMessage}</NoTodosMessage>;
    } else {
      return null;
    }
  }

  return (
    <SectionList
      testID={testID}
      ref={sectionListRef}
      sections={todoSections}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={todo => todo.id}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={listHeader()}
      renderSectionHeader={({section}) => (
        <List.Subheader style={styles.subheader}>
          {section.title} ({section.data.length})
        </List.Subheader>
      )}
      renderItem={({item: todo}) => (
        <List.Item
          key={todo.id}
          title={todo.attributes.name}
          titleNumberOfLines={4}
          onPress={() => onPressTodo(todo)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  subheader: {
    backgroundColor: theme.colors.background,
  },
});
