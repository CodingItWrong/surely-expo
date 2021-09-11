import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function NewTodoForm({onCreate}) {
  const [name, setName] = useState('');

  async function handleCreate() {
    await onCreate(name);
    setName('');
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
