import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, Title} from 'react-native-paper';
import baseUrl from './baseUrl';
import {useToken} from './token';

const client = axios.create({baseURL: baseUrl});

export default function Todo({navigation, route}) {
  const {token} = useToken();
  const Authorization = useMemo(() => `Bearer ${token}`, [token]);

  const [todo, setTodo] = useState(null);

  const {
    params: {id},
  } = route;

  useEffect(() => {
    client
      .get(`/todos/${id}`, {headers: {Authorization}})
      .then(response => setTodo(response.data.data))
      .catch(console.error);
  }, [id, Authorization]);

  const handleComplete = () =>
    client
      .patch(
        `/todos/${id}`,
        {
          data: {type: 'todos', id, attributes: {'completed-at': new Date()}},
        },
        {headers: {Authorization, 'Content-Type': 'application/vnd.api+json'}},
      )
      .then(() => navigation.goBack())
      .catch(console.error);

  const handleDelete = () =>
    client
      .patch(
        `/todos/${id}`,
        {
          data: {type: 'todos', id, attributes: {'deleted-at': new Date()}},
        },
        {headers: {Authorization, 'Content-Type': 'application/vnd.api+json'}},
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
