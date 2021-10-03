import {useLinkTo} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {useCategories} from '../data/categories';
import sharedStyles from '../sharedStyles';
import useIsMounted from '../utils/useIsMounted';

export default function CategoryDetail({route}) {
  const isMounted = useIsMounted();

  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const categoryClient = useCategories();
  const linkTo = useLinkTo();

  const {
    params: {id},
  } = route;
  const isNewCategory = id === 'new';

  useEffect(() => {
    if (isMounted.current && !isNewCategory) {
      categoryClient
        .find({id})
        .then(response => {
          if (isMounted.current) {
            const returnedCategory = response.data;
            setCategory(returnedCategory);
            setName(returnedCategory.attributes.name);
          }
        })
        .catch(console.error);
    }
  }, [id, isNewCategory, categoryClient, isMounted]);

  if (!isNewCategory && !category) {
    return <LoadingIndicator />;
  }

  const goBack = () => linkTo('/categories');

  const handleDelete = () =>
    categoryClient.delete({id}).then(goBack).catch(console.error);

  const handleSave = async () => {
    try {
      const attributes = {name};
      if (isNewCategory) {
        await categoryClient.create({attributes});
      } else {
        await categoryClient.update({id, attributes});
      }
      goBack();
    } catch (e) {
      console.error(e);
    }
  };

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
      {!isNewCategory && (
        <Button testID="delete-button" mode="outlined" onPress={handleDelete}>
          Delete
        </Button>
      )}
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
