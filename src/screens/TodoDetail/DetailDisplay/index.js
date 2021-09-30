import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Text, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Actions from './Actions';
import EventLog from './EventLog';

export default function DetailDisplay({
  todo,
  category,
  onEdit,
  onUpdate,
  onGoBack,
}) {
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.safeAreaView}
    >
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.titleRow}>
          <Title style={styles.title}>{todo.attributes.name}</Title>
          <IconButton
            testID="edit-button"
            icon="pencil"
            accessibilityLabel="Edit"
            onPress={onEdit}
          />
        </View>
        <Text>Category: {category?.attributes?.name ?? 'none'}</Text>
        {todo.attributes.notes ? <Text>{todo.attributes.notes}</Text> : null}
        <EventLog todo={todo} />
        <Actions todo={todo} onUpdate={onUpdate} onGoBack={onGoBack} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  bodyContainer: {
    marginHorizontal: 15,
  },
  titleRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});
