import {SectionList} from 'react-native';
import {List, withTheme} from 'react-native-paper';
import ErrorMessage from './ErrorMessage';
import NoTodosMessage from './NoTodosMessage';
import TodoListItem from './TodoListItem';

function TodoList({
  testID,
  todoSections,
  noTodosMessage,
  errorMessage,
  sectionListRef,
  onPressTodo,
  onRefresh,
  refreshing,
  isInitialLoad,
  contentContainerStyle,
  theme,
}) {
  const subheaderStyle = {
    backgroundColor: theme.colors.background,
  };

  function listHeader() {
    if (errorMessage) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (todoSections.length === 0 && !isInitialLoad) {
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
        <List.Subheader style={subheaderStyle}>
          {section.title} ({section.data.length})
        </List.Subheader>
      )}
      renderItem={({item: todo}) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onPress={() => onPressTodo(todo)}
        />
      )}
    />
  );
}

export default withTheme(TodoList);
