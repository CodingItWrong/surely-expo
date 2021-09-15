import React, {useEffect, useState} from 'react';
import {Button, IconButton, Text} from 'react-native-paper';
import {useTodos} from '../../data/todos';
import DetailDisplay from './DetailDisplay';
import DetailForm from './DetailForm';
import EventLog from './EventLog';

export default function TodoDetail({navigation, route}) {
  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];

  const {
    params: {id},
  } = route;

  const storeResponse = ({data}) => setTodo(data);

  useEffect(() => {
    todoClient.find({id}).then(storeResponse).catch(console.error);
  }, [id, todoClient]);

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleComplete = () =>
    updateAttributes({'completed-at': new Date()})
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleUncomplete = () =>
    updateAttributes({'completed-at': null})
      .then(storeResponse)
      .catch(console.error);

  const handleDelete = () =>
    updateAttributes({'deleted-at': new Date()})
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleUndelete = () =>
    updateAttributes({'deleted-at': null})
      .then(storeResponse)
      .catch(console.error);

  const handleSave = attributes =>
    updateAttributes(attributes)
      .then(storeResponse)
      .then(() => setIsEditing(false))
      .catch(console.error);

  if (!todo) {
    return <Text>Loading…</Text>;
  }

  return (
    <>
      <IconButton
        icon="pencil"
        accessibilityLabel="Edit"
        onPress={() => setIsEditing(true)}
      />
      {isEditing ? (
        <DetailForm
          todo={todo}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <DetailDisplay todo={todo} />
      )}
      <EventLog todo={todo} />
      {isDeleted ? (
        <Button mode="outlined" onPress={handleUndelete}>
          Undelete
        </Button>
      ) : (
        <Button mode="outlined" onPress={handleDelete}>
          Delete
        </Button>
      )}
      {isCompleted ? (
        <Button
          mode="contained"
          icon="checkbox-marked"
          onPress={handleUncomplete}
        >
          Uncomplete
        </Button>
      ) : (
        <Button
          mode="contained"
          icon="checkbox-marked"
          onPress={handleComplete}
        >
          Complete
        </Button>
      )}
    </>
  );
}
