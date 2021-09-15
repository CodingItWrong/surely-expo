import React from 'react';
import {Button} from 'react-native-paper';
import {useTodos} from '../../../data/todos';

export default function Actions({todo, onUpdate, onGoBack}) {
  const {id} = todo;
  const todoClient = useTodos();
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  const handleComplete = () =>
    updateAttributes({'completed-at': new Date()})
      .then(onGoBack)
      .catch(console.error);

  const handleUncomplete = () =>
    updateAttributes({'completed-at': null})
      .then(handleResponse)
      .catch(console.error);

  const handleDelete = () =>
    updateAttributes({'deleted-at': new Date()})
      .then(onGoBack)
      .catch(console.error);

  const handleUndelete = () =>
    updateAttributes({'deleted-at': null, 'completed-at': null})
      .then(handleResponse)
      .catch(console.error);

  return (
    <>
      {isDeleted ? (
        <Button mode="outlined" onPress={handleUndelete}>
          Undelete
        </Button>
      ) : (
        <>
          <Button mode="outlined" onPress={handleDelete}>
            Delete
          </Button>
          {isCompleted ? (
            <Button
              mode="contained"
              icon="checkbox-marked"
              onPress={handleUncomplete}
            >
              Uncomplete
            </Button>
          ) : (
            <Button
              mode="contained"
              icon="checkbox-marked"
              onPress={handleComplete}
            >
              Complete
            </Button>
          )}
        </>
      )}
    </>
  );
}
