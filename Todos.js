import {useLinkTo} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {List} from 'react-native-paper';
import store, {setToken} from './store';
import {useToken} from './token';
import useOrbitQuery from './useOrbitQuery';

// const query = q =>
//   q.findRecords('todo').filter({attribute: 'status', value: 'available'});

const query = q => q.findRecords('todo');

export default function Todos() {
  const {token} = useToken();

  useEffect(() => {
    setToken(token);
  }, [token]);

  const todos = useOrbitQuery({store, query});
  const linkTo = useLinkTo();

  return (
    <FlatList
      data={todos}
      keyExtractor={todo => todo.id}
      renderItem={({item: todo}) => (
        <List.Item
          key={todo.id}
          title={todo.attributes.name}
          onPress={() => linkTo(`/todos/${todo.id}`)}
        />
      )}
    />
  );
}
