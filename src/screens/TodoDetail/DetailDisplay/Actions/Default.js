import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {useTodos} from '../../../../data/todos';
import sharedStyles from '../../../../sharedStyles';

export default function Default({todo, onUpdate, onGoBack, onDefer}) {
  const {id} = todo;
  const todoClient = useTodos();
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];
  const [isLoading, setIsLoading] = useState(false);

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  async function handleComplete() {
    try {
      setIsLoading(true);
      await updateAttributes({'completed-at': new Date()});
      onGoBack();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUncomplete() {
    try {
      setIsLoading(true);
      const response = await updateAttributes({'completed-at': null});
      setIsLoading(false);
      handleResponse(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await updateAttributes({'deleted-at': new Date()});
      onGoBack();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUndelete() {
    try {
      setIsLoading(true);
      const response = await updateAttributes({
        'deleted-at': null,
        'completed-at': null,
      });
      setIsLoading(false);
      handleResponse(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isDeleted ? (
        <Button
          testID="undelete-button"
          mode="outlined"
          onPress={handleUndelete}
          style={sharedStyles.buttonSpacing}
          disabled={isLoading}
        >
          Undelete
        </Button>
      ) : (
        <>
          <Button
            testID="delete-button"
            mode="outlined"
            onPress={handleDelete}
            style={sharedStyles.buttonSpacing}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            testID="defer-button"
            mode="outlined"
            onPress={onDefer}
            style={sharedStyles.buttonSpacing}
            disabled={isLoading}
          >
            Defer
          </Button>
          {isCompleted ? (
            <Button
              testID="uncomplete-button"
              mode="contained"
              icon="checkbox-marked"
              onPress={handleUncomplete}
              style={sharedStyles.buttonSpacing}
              disabled={isLoading}
            >
              Uncomplete
            </Button>
          ) : (
            <Button
              testID="complete-button"
              mode="contained"
              icon="checkbox-marked"
              onPress={handleComplete}
              style={sharedStyles.buttonSpacing}
              disabled={isLoading}
            >
              Complete
            </Button>
          )}
        </>
      )}
    </>
  );
}
