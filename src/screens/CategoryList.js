import {useLinkTo} from '@react-navigation/native';
import sortBy from 'lodash/sortBy';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCategories} from '../data/categories';

export default function CategoryList() {
  const [categories, setCategories] = useState(null);
  const categoryClient = useCategories();
  const linkTo = useLinkTo();

  const onPressCategory = category => linkTo(`/categories/${category.id}`);

  useEffect(() => {
    categoryClient
      .all()
      .then(({data}) => setCategories(sortBy(data, 'attributes.sort-order')))
      .catch(console.error);
  }, [categoryClient]);

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <FlatList
        testID="category-list"
        data={categories}
        keyExtractor={todo => todo.id}
        renderItem={({item: category}) => (
          <List.Item
            key={category.id}
            title={category.attributes.name}
            onPress={() => onPressCategory(category)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
