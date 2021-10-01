import {useLinkTo} from '@react-navigation/native';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Button, IconButton, List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCategories} from '../data/categories';
import {
  arrayWithItemMovedDownward,
  arrayWithItemMovedUpward,
  elementsWithIndex,
} from '../utils/array';

export default function CategoryList() {
  const [categories, setCategories] = useState(null);
  const categoryClient = useCategories();
  const linkTo = useLinkTo();

  const onPressCategory = category => linkTo(`/categories/${category.id}`);

  const handleAdd = () => linkTo('/categories/new');

  const loadCategories = useCallback(
    () =>
      categoryClient
        .all()
        .then(({data}) => setCategories(sortBy(data, 'attributes.sort-order')))
        .catch(console.error),
    [categoryClient],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function moveUpward(categoryToMove) {
    const categoriesAfterMove = arrayWithItemMovedUpward(
      categories,
      categoryToMove,
    );
    updateCategorySortOrder(categoriesAfterMove);
  }

  function moveDownward(categoryToMove) {
    const categoriesAfterMove = arrayWithItemMovedDownward(
      categories,
      categoryToMove,
    );
    updateCategorySortOrder(categoriesAfterMove);
  }

  async function updateCategorySortOrder(sortedCategories) {
    const categoriesWithIndex = elementsWithIndex(sortedCategories);
    for (const [category, sortOrder] of categoriesWithIndex) {
      if (category.sortOrder !== sortOrder) {
        await categoryClient.update({
          id: category.id,
          attributes: {'sort-order': sortOrder},
        });
      }
    }
    return loadCategories();
  }

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
            right={() => (
              <>
                <IconButton
                  icon="arrow-up"
                  onPress={() => moveUpward(category)}
                />
                <IconButton
                  icon="arrow-down"
                  onPress={() => moveDownward(category)}
                />
              </>
            )}
          />
        )}
      />
      <Button
        testID="add-button"
        mode="outlined"
        icon="plus"
        onPress={handleAdd}
      >
        Add
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
