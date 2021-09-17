import React from 'react';
import {Button} from 'react-native-paper';
import {useTodos} from '../../../../data/todos';
import styles from '../../styles';

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
        <Button mode="outlined" onPress={handleUndelete} style={styles.button}>
          Undelete
        </Button>
      ) : (
        <>
          <Button mode="outlined" onPress={handleDelete} style={styles.button}>
            Delete
          </Button>
          <Button mode="outlined" onPress={onDefer} style={styles.button}>
            Defer
          </Button>
          {isCompleted ? (
            <Button
              mode="contained"
              icon="checkbox-marked"
              onPress={handleUncomplete}
              style={styles.button}
            >
              Uncomplete
            </Button>
          ) : (
            <Button
              mode="contained"
              icon="checkbox-marked"
              onPress={handleComplete}
              style={styles.button}
            >
              Complete
            </Button>
          )}
        </>
      )}
    </>
  );
}
