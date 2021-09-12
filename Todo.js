import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, Title} from 'react-native-paper';
import api from './api';
import {useToken} from './token';

export default function Todo({navigation, route}) {
  const {token} = useToken();
  const config = useMemo(
    () => ({headers: {Authorization: `Bearer ${token}`}}),
    [token],
  );

  const [todo, setTodo] = useState(null);

  const {
    params: {id},
  } = route;

  useEffect(() => {
    api
      .get(`/todos/${id}`, config)
      .then(response => setTodo(response.data))
      .catch(console.error);
  }, [id, config]);

  const handleComplete = () =>
    api
      .patch(
        `/todos/${id}`,
        {
          data: {type: 'todos', id, attributes: {'completed-at': new Date()}},
        },
        config,
      )
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleDelete = () =>
    api
      .patch(
        `/todos/${id}`,
        {
          data: {type: 'todos', id, attributes: {'deleted-at': new Date()}},
        },
        config,
      )
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
