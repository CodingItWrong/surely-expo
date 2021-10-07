import {useLinkTo} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import ErrorMessage from '../components/ErrorMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import ScreenBackground from '../components/ScreenBackground';
import {useCategories} from '../data/categories';
import sharedStyles from '../sharedStyles';
import useIsMounted from '../utils/useIsMounted';

export default function CategoryDetail({route}) {
  const isMounted = useIsMounted();

  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const goBack = () => linkTo('/categories');

  async function handleSave() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const attributes = {name};
      if (isNewCategory) {
        await categoryClient.create({attributes});
      } else {
        await categoryClient.update({id, attributes});
      }
      goBack();
    } catch (e) {
      setIsLoading(false);
      setErrorMessage('An error occurred saving the category.');
      console.error(e);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await categoryClient.delete({id});
      goBack();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred deleting the category.');
      console.error(error);
    }
  }

  function contents() {
    if (!isNewCategory && !category) {
      return <LoadingIndicator />;
    }

    return (
      <View style={sharedStyles.bodyContainer}>
        <TextInput
          testID="name-field"
          label="Category name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          multiline
          style={styles.nameInput}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button
          testID="cancel-button"
          mode="outlined"
          onPress={goBack}
          style={sharedStyles.buttonSpacing}
          disabled={isLoading}
        >
          Cancel
        </Button>
        {!isNewCategory && (
          <Button
            testID="delete-button"
            mode="outlined"
            onPress={handleDelete}
            style={sharedStyles.buttonSpacing}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
        <Button
          testID="save-button"
          mode="contained"
          icon="content-save"
          onPress={handleSave}
          style={sharedStyles.buttonSpacing}
          disabled={isLoading}
        >
          Save
        </Button>
      </View>
    );
  }

  return <ScreenBackground>{contents()}</ScreenBackground>;
}

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 20,
  },
});
