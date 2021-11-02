import {List} from 'react-native-paper';

export default function TodoListItem({todo, onPress}) {
  return (
    <List.Item
      title={todo.attributes.name}
      titleNumberOfLines={4}
      onPress={onPress}
    />
  );
}
