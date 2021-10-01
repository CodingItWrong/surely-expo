import React, {useEffect, useState} from 'react';
import {Title} from 'react-native-paper';
import LoadingIndicator from '../components/LoadingIndicator';
import {useCategories} from '../data/categories';

export default function CategoryList({route}) {
  const [category, setCategory] = useState(null);
  const categoryClient = useCategories();

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

  return <Title>{category.attributes.name}</Title>;
}
