import React, {useEffect, useState} from 'react';
import {Button, Text, Title} from 'react-native-paper';
import {useTodos} from './todos';

export default function TodoDetail({navigation, route}) {
  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);

  const {
    params: {id},
  } = route;

  useEffect(() => {
    todoClient
      .find({id})
      .then(({data}) => setTodo(data))
      .catch(console.error);
  }, [id, todoClient]);

  const handleComplete = () =>
    todoClient
      .update({id, attributes: {'completed-at': new Date()}})
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleDelete = () =>
    todoClient
      .update({id, attributes: {'deleted-at': new Date()}})
      .then(() => navigation.goBack())
      .catch(console.error);

  if (!todo) {
    return <Text>Loading…</Text>;
  }

  return (
    <>
      <Title>{todo.attributes.name}</Title>
      <Button mode="outlined" onPress={handleDelete}>
        Delete
      </Button>
      <Button mode="contained" icon="checkbox-marked" onPress={handleComplete}>
        Complete
      </Button>
    </>
  );
}
