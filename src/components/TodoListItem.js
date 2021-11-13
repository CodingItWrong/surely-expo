import {List} from '@codingitwrong/react-native-paper';

export default function TodoListItem({todo, onPress}) {
  return (
    <List.Item
      title={todo.attributes.name}
      titleNumberOfLines={4}
      accessibilityRole="button"
      onPress={onPress}
    />
  );
}
