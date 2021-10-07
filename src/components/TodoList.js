import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import theme from '../theme';
import ErrorMessage from './ErrorMessage';

export default function TodoList({
  testID,
  todoSections,
  errorMessage,
  sectionListRef,
  onPressTodo,
  onRefresh,
  refreshing,
  contentContainerStyle,
}) {
  return (
    <SectionList
      testID={testID}
      ref={sectionListRef}
      sections={todoSections}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={todo => todo.id}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={<ErrorMessage>{errorMessage}</ErrorMessage>}
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
