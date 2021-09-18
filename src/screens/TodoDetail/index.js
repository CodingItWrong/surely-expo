import React, {useEffect, useState} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useTodos} from '../../data/todos';
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
        onEdit={() => setIsEditing(true)}
        onUpdate={setTodo}
        onGoBack={goBack}
      />
    );
  }
}

export const createTodoDetail = parentRouteName => props =>
  <TodoDetail {...props} parentRouteName={parentRouteName} />;
