import React, {useEffect, useState} from 'react';
import {Button, Text, Title} from 'react-native-paper';
import {useTodos} from '../../data/todos';
import EventLog from './EventLog';

export default function TodoDetail({navigation, route}) {
  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];

  const {
    params: {id},
  } = route;

  const loadTodo = () =>
    todoClient
      .find({id})
      .then(({data}) => setTodo(data))
      .catch(console.error);

  useEffect(() => {
    todoClient
      .find({id})
      .then(({data}) => setTodo(data))
      .catch(console.error);
  }, [id, todoClient]);

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleComplete = () =>
    updateAttributes({'completed-at': new Date()})
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleUncomplete = () =>
    updateAttributes({'completed-at': null})
      .then(loadTodo)
      .catch(console.error);

  const handleDelete = () =>
    updateAttributes({'deleted-at': new Date()})
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleUndelete = () =>
    updateAttributes({'deleted-at': null}).then(loadTodo).catch(console.error);

  if (!todo) {
    return <Text>Loading…</Text>;
  }

  return (
    <>
      <Title>{todo.attributes.name}</Title>
      {todo.attributes.notes && <Text>{todo.attributes.notes}</Text>}
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
