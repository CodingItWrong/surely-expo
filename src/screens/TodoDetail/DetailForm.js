import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {relativeDate} from '../../utils/time';

export default function DetailForm({todo, onSave, onCancel}) {
  const [name, setName] = useState(todo.attributes.name ?? '');
  const [notes, setNotes] = useState(todo.attributes.notes ?? '');
  const [deferredUntil, setDeferredUntil] = useState(
    todo.attributes['deferred-until'],
  );

  const [isDeferredUntilModalOpen, setIsDeferredUntilModalOpen] =
    useState(false);

  function handleChangeDeferredUntil({date}) {
    console.log({date});
    if (date) {
      console.log(1, date.toISOString());
      setDeferredUntil(date.toISOString());
    } else {
      console.log(2);
      setDeferredUntil(null);
    }
    setIsDeferredUntilModalOpen(false);
  }

  function handlePressSave() {
    const attributes = {name, notes, 'deferred-until': deferredUntil};
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
      <Button mode="outlined" onPress={() => setIsDeferredUntilModalOpen(true)}>
        Deferred until {relativeDate(deferredUntil)}
      </Button>
      <DatePickerModal
        visible={isDeferredUntilModalOpen}
        mode="single"
        date={deferredUntil ? new Date(deferredUntil) : null}
        onConfirm={handleChangeDeferredUntil}
        onDismiss={() => setIsDeferredUntilModalOpen(false)}
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        style={styles.notesInput}
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

const styles = StyleSheet.create({
  notesInput: {
    maxHeight: 200,
  },
});
