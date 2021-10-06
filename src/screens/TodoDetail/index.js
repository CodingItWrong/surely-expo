import React, {useCallback, useEffect, useState} from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useTodos} from '../../data/todos';
import useIsMounted from '../../utils/useIsMounted';
import DetailDisplay from './DetailDisplay';
import DetailForm from './DetailForm';

export default function TodoDetail({navigation, route, parentRouteName}) {
  const isMounted = useIsMounted();

  const todoClient = useTodos();

  const [todo, setTodo] = useState(null);
  const [category, setCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    params: {id},
  } = route;

  const storeResponse = useCallback(
    response => {
      if (isMounted.current) {
        setTodo(response.data);
        setCategory(response.included?.[0]);
      }
    },
    [isMounted],
  );

  useEffect(() => {
    if (isMounted.current) {
      todoClient
        .find({id, options: {include: 'category'}})
        .then(storeResponse)
        .catch(console.error);
    }
  }, [isMounted, id, todoClient, storeResponse]);

  const updateTodo = ({attributes, relationships}) =>
    todoClient.update({
      id,
      attributes,
      relationships,
      options: {include: 'category'},
    });

  const handleSave = ({attributes, relationships}) =>
    updateTodo({attributes, relationships})
      .then(storeResponse)
      .then(() => {
        if (isMounted.current) {
          setIsEditing(false);
        }
      });

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
