import {useLinkTo} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {useCategories} from '../data/categories';

export default function CategoryList({route}) {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const categoryClient = useCategories();
  const linkTo = useLinkTo();

  const {
    params: {id},
  } = route;

  useEffect(() => {
    categoryClient
      .find({id})
      .then(response => {
        const returnedCategory = response.data;
        setCategory(returnedCategory);
        setName(returnedCategory.attributes.name);
      })
      .catch(console.error);
  }, [id, categoryClient]);

  if (!category) {
    return <LoadingIndicator />;
  }

  const goBack = () => linkTo('/categories');

  const handleDelete = () =>
    categoryClient.delete({id}).then(goBack).catch(console.error);

  const handleSave = () =>
    categoryClient
      .update({id, attributes: {name}})
      .then(goBack)
      .catch(console.error);

  return (
    <>
      <TextInput
        testID="name-field"
        label="Category name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        multiline
        style={styles.nameInput}
      />
      <Button testID="cancel-button" mode="outlined" onPress={goBack}>
        Cancel
      </Button>
      <Button testID="delete-button" mode="outlined" onPress={handleDelete}>
        Delete
      </Button>
      <Button
        testID="save-button"
        mode="contained"
        icon="content-save"
        onPress={handleSave}
      >
        Save
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 20,
  },
});
