import React from 'react';
import {Text} from 'react-native';

export default function Todo({route}) {
  const {
    params: {id},
  } = route;

  return (
    <>
      <Text>Todo {id}</Text>
    </>
  );
}
