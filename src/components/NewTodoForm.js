import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
// import {TextInput} from 'react-native-paper';

export default function NewTodoForm({isCreating, onCreate}) {
  const [name, setName] = useState('');

  return (
    <TextInput
      testID="new-todo-name"
      placeholder="New todo name"
      accessibilityLabel="New todo name"
      value={name}
      onChangeText={setName}
      autoCapitalize="sentences"
      autoCorrect
      style={styles.textInput}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
  },
});
