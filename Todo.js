import React, {useEffect, useState} from 'react';
import {Button, Text, Title} from 'react-native-paper';
import {useStore} from './store';

export default function Todo({navigation, route}) {
  const [todo, setTodo] = useState(null);

  const store = useStore();
  const {
    params: {id},
  } = route;

  useEffect(() => {
    store.query(q => q.findRecord({type: 'todo', id})).then(setTodo);
  }, [id, store]);

  const handleComplete = () =>
    store
      .update(t =>
        t.updateRecord({
          type: 'todo',
          id: todo.id,
          attributes: {completedAt: new Date()},
        }),
      )
      .then(() => navigation.goBack());

  if (!todo) {
    return <Text>Loading…</Text>;
  }

  return (
    <>
      <Title>{todo.attributes.name}</Title>
      <Button onPress={handleComplete}>Complete</Button>
    </>
  );
}
