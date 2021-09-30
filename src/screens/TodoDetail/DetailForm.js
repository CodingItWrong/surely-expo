import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import PaperDropdown from '../../components/PaperDropdown';
import {useCategories} from '../../data/categories';
import {relativeDate} from '../../utils/time';
import sharedStyles from './styles';

export default function DetailForm({todo, onSave, onCancel}) {
  const categoryClient = useCategories();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(todo.attributes.name ?? '');
  const [categoryId, setCategoryId] = useState(
    todo.relationships.category.data?.id,
  );
  const [notes, setNotes] = useState(todo.attributes.notes ?? '');
  const [deferredUntil, setDeferredUntil] = useState(
    todo.attributes['deferred-until'],
  );

  const category = categories?.find(c => c.id === categoryId);
  const setCategory = c => setCategoryId(c?.id);

  useEffect(() => {
    categoryClient
      .all()
      .then(({data}) => setCategories(sortBy(data, 'attributes.sort-order')))
      .catch(console.error);
  }, [categoryClient]);

  const [isDeferredUntilModalOpen, setIsDeferredUntilModalOpen] =
    useState(false);

  function handleChangeDeferredUntil({date}) {
    if (date) {
      setDeferredUntil(date.toISOString());
    } else {
      setDeferredUntil(null);
    }
    setIsDeferredUntilModalOpen(false);
  }

  function handlePressSave() {
    const attributes = {name, notes, 'deferred-until': deferredUntil};
    const categoryReference = category ? pick(category, ['type', 'id']) : null;
    const relationships = {category: {data: categoryReference}};
    onSave({attributes, relationships});
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.bodyContainer}>
        <TextInput
          testID="name-field"
          label="Todo name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          multiline
          style={styles.nameInput}
        />
        <PaperDropdown
          fieldLabel="Category"
          emptyLabel="none"
          value={category}
          onValueChange={setCategory}
          options={categories}
          style={styles.chooser}
          keyExtractor={option => option.id}
          labelExtractor={option => option.attributes.name}
        />
        <Button
          mode="outlined"
          onPress={() => setIsDeferredUntilModalOpen(true)}
          style={sharedStyles.button}
        >
          Defer until day: {relativeDate(deferredUntil) ?? 'n/a'}
        </Button>
        <DatePickerModal
          visible={isDeferredUntilModalOpen}
          mode="single"
          date={deferredUntil ? new Date(deferredUntil) : null}
          onConfirm={handleChangeDeferredUntil}
          onDismiss={() => setIsDeferredUntilModalOpen(false)}
        />
        <TextInput
          testID="notes-field"
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          mode="outlined"
          style={styles.notesInput}
        />
        <Button
          testID="cancel-button"
          mode="outlined"
          onPress={onCancel}
          style={sharedStyles.button}
        >
          Cancel
        </Button>
        <Button
          testID="save-button"
          mode="contained"
          icon="content-save"
          onPress={handlePressSave}
          style={sharedStyles.button}
        >
          Save
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    margin: 15,
  },
  chooser: {
    marginTop: 10,
  },
  nameInput: {
    fontSize: 20,
  },
  notesInput: {
    marginTop: 10,
    maxHeight: 200,
  },
});
