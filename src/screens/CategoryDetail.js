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

  const handleCancel = () => linkTo('/categories');

  return (
    <>
      <Title>{category.attributes.name}</Title>
      <Button testID="cancel-button" mode="outlined" onPress={handleCancel}>
        Cancel
      </Button>
    </>
  );
}
