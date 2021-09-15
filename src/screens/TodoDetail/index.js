import React, {useEffect, useState} from 'react';
import {IconButton, Text} from 'react-native-paper';
import {useTodos} from '../../data/todos';
import Actions from './Actions';
import DetailDisplay from './DetailDisplay';
import DetailForm from './DetailForm';

export default function TodoDetail({navigation, route, parentRouteName}) {
  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    params: {id},
  } = route;

  const storeResponse = ({data}) => setTodo(data);

  useEffect(() => {
    todoClient.find({id}).then(storeResponse).catch(console.error);
  }, [id, todoClient]);

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleSave = attributes =>
    updateAttributes(attributes)
      .then(storeResponse)
      .then(() => setIsEditing(false))
      .catch(console.error);

  const goBack = () => navigation.navigate(parentRouteName);

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
      <Actions todo={todo} onUpdate={setTodo} onGoBack={goBack} />
    </>
  );
}

export const createTodoDetail = parentRouteName => props =>
  <TodoDetail {...props} parentRouteName={parentRouteName} />;
