import React from 'react';
import {Button} from 'react-native-paper';
import {useTodos} from '../../../../data/todos';
import sharedStyles from '../../../../sharedStyles';

export default function Default({todo, onUpdate, onGoBack, onDefer}) {
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
        <Button
          testID="undelete-button"
          mode="outlined"
          onPress={handleUndelete}
          style={sharedStyles.button}
        >
          Undelete
        </Button>
      ) : (
        <>
          <Button
            testID="delete-button"
            mode="outlined"
            onPress={handleDelete}
            style={sharedStyles.button}
          >
            Delete
          </Button>
          <Button
            testID="defer-button"
            mode="outlined"
            onPress={onDefer}
            style={sharedStyles.button}
          >
            Defer
          </Button>
          {isCompleted ? (
            <Button
              testID="uncomplete-button"
              mode="contained"
              icon="checkbox-marked"
              onPress={handleUncomplete}
              style={sharedStyles.button}
            >
              Uncomplete
            </Button>
          ) : (
            <Button
              testID="complete-button"
              mode="contained"
              icon="checkbox-marked"
              onPress={handleComplete}
              style={sharedStyles.button}
            >
              Complete
            </Button>
          )}
        </>
      )}
    </>
  );
}
