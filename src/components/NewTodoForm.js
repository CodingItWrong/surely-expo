import {TextInput} from '@codingitwrong/react-native-paper';
import {useState} from 'react';
import {Keyboard} from 'react-native';

export default function NewTodoForm({isCreating, onCreate}) {
  const [name, setName] = useState('');

  async function handleCreate() {
    try {
      if (name !== '') {
        await onCreate(name);
        setName('');
      }
      Keyboard.dismiss();
    } catch {
      // no-op so browser sees promise rejection handled
    }
  }

  return (
    <TextInput
      testID="new-todo-name"
      label="New todo name"
      accessibilityLabel="New todo name"
      value={name}
      onChangeText={setName}
      onSubmitEditing={handleCreate}
      autoCapitalize="sentences"
      autoCorrect
      right={isCreating && <TextInput.Icon icon="clock-outline" />}
    />
  );
}
