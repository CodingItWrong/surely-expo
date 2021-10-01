import {useLinkTo} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Title} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {useCategories} from '../data/categories';

export default function CategoryList({route}) {
  const [category, setCategory] = useState(null);
  const categoryClient = useCategories();
  const linkTo = useLinkTo();

  const {
    params: {id},
  } = route;

  useEffect(() => {
    categoryClient
      .find({id})
      .then(response => setCategory(response.data))
      .catch(console.error);
  }, [id, categoryClient]);

  if (!category) {
    return <LoadingIndicator />;
  }

  const goBack = () => linkTo('/categories');

  const handleDelete = () =>
    categoryClient.delete({id}).then(goBack).catch(console.error);

  return (
    <>
      <Title>{category.attributes.name}</Title>
      <Button testID="cancel-button" mode="outlined" onPress={goBack}>
        Cancel
      </Button>
      <Button testID="delete-button" mode="outlined" onPress={handleDelete}>
        Delete
      </Button>
    </>
  );
}
