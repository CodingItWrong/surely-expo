import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function NewTodoForm({isCreating, onCreate}) {
  const [name, setName] = useState('');

  async function handleCreate() {
    if (name !== '') {
      await onCreate(name);
      setName('');
    }
    Keyboard.dismiss();
  }

  return (
    <TextInput
      testID="new-todo-name"
      label="New todo name!!!1!"
      value={name}
      onChangeText={setName}
      onSubmitEditing={handleCreate}
      autoCapitalize="sentences"
      autoCorrect
      right={isCreating && <TextInput.Icon icon="clock-outline" />}
    />
  );
}
