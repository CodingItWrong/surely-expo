import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';

export default function DetailForm({todo, onSave, onCancel}) {
  const [name, setName] = useState(todo.attributes.name);
  const [notes, setNotes] = useState(todo.attributes.notes);

  function handlePressSave() {
    const attributes = {name, notes};
    onSave(attributes);
  }

  return (
    <>
      <TextInput
        label="Todo name"
        value={name}
        onChangeText={setName}
        multiline
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button mode="outlined" onPress={onCancel}>
        Cancel
      </Button>
      <Button mode="contained" icon="content-save" onPress={handlePressSave}>
        Save
      </Button>
    </>
  );
}
