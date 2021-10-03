import {useLinkTo} from '@react-navigation/native';
import sortBy from 'lodash/sortBy';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {Button, IconButton, List} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import NoTodosMessage from '../components/NoTodosMessage';
import {useCategories} from '../data/categories';
import {
  arrayWithItemMovedDownward,
  arrayWithItemMovedUpward,
  elementsWithIndex,
} from '../utils/array';

export default function CategoryList() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [categories, setCategories] = useState(null);
  const categoryClient = useCategories();
  const linkTo = useLinkTo();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPressCategory = category => linkTo(`/categories/${category.id}`);

  const handleAdd = () => linkTo('/categories/new');

  const loadFromServer = useCallback(
    () =>
      categoryClient
        .all()
        .then(({data}) => {
          setCategories(sortBy(data, 'attributes.sort-order'));
          setShowLoadingIndicator(false);
          return data;
        })
        .catch(console.error),
    [categoryClient],
  );

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

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
    return loadFromServer();
  }

  async function reloadFromPull() {
    setIsRefreshing(true);
    await loadFromServer();
    setIsRefreshing(false);
  }

  async function reloadFromButton() {
    setShowLoadingIndicator(true);
    const newCategories = await loadFromServer();
    if (newCategories.length > 0) {
      flatListRef.current.scrollToIndex({index: 0});
    }
  }

  function contents() {
    if (showLoadingIndicator) {
      return <LoadingIndicator />;
    } else if (categories.length === 0) {
      return <NoTodosMessage>No categories yet</NoTodosMessage>;
    } else {
      return (
        <View style={styles.listContainer}>
          <Button
            testID="add-button"
            mode="outlined"
            icon="plus"
            onPress={handleAdd}
          >
            Add
          </Button>
          <FlatList
            testID="category-list"
            ref={flatListRef}
            data={categories}
            keyExtractor={todo => todo.id}
            onRefresh={reloadFromPull}
            refreshing={isRefreshing}
            contentContainerStyle={{paddingBottom: insets.bottom}}
            renderItem={({item: category}) => (
              <List.Item
                key={category.id}
                title={category.attributes.name}
                onPress={() => onPressCategory(category)}
                right={() => (
                  <>
                    <IconButton
                      testID="move-up-button"
                      icon="arrow-up"
                      onPress={() => moveUpward(category)}
                    />
                    <IconButton
                      testID="move-down-button"
                      icon="arrow-down"
                      onPress={() => moveDownward(category)}
                    />
                  </>
                )}
              />
            )}
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Button onPress={reloadFromButton}>Reload</Button>
      )}
      {contents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
