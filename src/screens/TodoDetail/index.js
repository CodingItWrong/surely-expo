import React, {useEffect, useState} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useTodos} from '../../data/todos';
import DetailDisplay from './DetailDisplay';
import DetailForm from './DetailForm';

export default function TodoDetail({navigation, route, parentRouteName}) {
  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);
  const [category, setCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    params: {id},
  } = route;

  // TODO: confirm it updates the category too
  const storeResponse = response => {
    setTodo(response.data);
    setCategory(response.included?.[0]);
  };

  useEffect(() => {
    todoClient
      .find({id, options: {include: 'category'}})
      .then(storeResponse)
      .catch(console.error);
  }, [id, todoClient]);

  const updateTodo = ({attributes, relationships}) =>
    todoClient.update(
      {
        id,
        attributes,
        relationships,
      },
      {options: {include: 'category'}},
    );

  const handleSave = ({attributes, relationships}) =>
    updateTodo({attributes, relationships})
      .then(storeResponse)
      .then(() => setIsEditing(false))
      .catch(console.error);

  const goBack = () => navigation.navigate(parentRouteName);

  if (!todo) {
    return <LoadingIndicator />;
  }

  if (isEditing) {
    return (
      <DetailForm
        todo={todo}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  } else {
    return (
      <DetailDisplay
        todo={todo}
        category={category}
        onEdit={() => setIsEditing(true)}
        onUpdate={setTodo}
        onGoBack={goBack}
      />
    );
  }
}

export const createTodoDetail = parentRouteName => props =>
  <TodoDetail {...props} parentRouteName={parentRouteName} />;
