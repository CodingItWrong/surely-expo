import React from 'react';
import {SectionList} from 'react-native';
import {List} from 'react-native-paper';

export default function TodoList({
  testID,
  todoSections,
  sectionListRef,
  onPressTodo,
}) {
  return (
    <SectionList
      testID={testID}
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
          onPress={() => onPressTodo(todo)}
        />
      )}
    />
  );
}
