import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function NewTodoForm({onCreate}) {
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
      label="New todo name"
      value={name}
      onChangeText={setName}
      onSubmitEditing={handleCreate}
      autoCapitalize="sentences"
      autCorrect
    />
  );
}
