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
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.editButtonRow}>
          <IconButton
            icon="pencil"
            accessibilityLabel="Edit"
            onPress={onEdit}
          />
        </View>
        <Title>{todo.attributes.name}</Title>
        <Text>Category: {category?.attributes?.name ?? 'none'}</Text>
        {todo.attributes.notes ? <Text>{todo.attributes.notes}</Text> : null}
        <EventLog todo={todo} />
        <Actions todo={todo} onUpdate={onUpdate} onGoBack={onGoBack} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    marginHorizontal: 15,
  },
  editButtonRow: {
    alignItems: 'flex-end',
  },
});
