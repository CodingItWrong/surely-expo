import {useState} from 'react';
import {Button} from 'react-native-paper';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useTodos} from '../../../../data/todos';
import sharedStyles from '../../../../sharedStyles';

export default function Default({todo, onUpdate, onGoBack, onDefer}) {
  const {id} = todo;
  const todoClient = useTodos();
  const isCompleted = !!todo?.attributes['completed-at'];
  const isDeleted = !!todo?.attributes['deleted-at'];
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateAttributes = attributes => todoClient.update({id, attributes});

  const handleResponse = ({data}) => onUpdate(data);

  async function handleComplete() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await updateAttributes({'completed-at': new Date()});
      onGoBack();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred marking the todo complete.');
      console.error(error);
    }
  }

  async function handleUncomplete() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await updateAttributes({'completed-at': null});
      handleResponse(response);
    } catch (error) {
      setErrorMessage('An error occurred marking the todo incomplete.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await updateAttributes({'deleted-at': new Date()});
      onGoBack();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('An error occurred deleting the todo.');
      console.error(error);
    }
  }

  async function handleUndelete() {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const response = await updateAttributes({
        'deleted-at': null,
        'completed-at': null,
      });
      handleResponse(response);
    } catch (error) {
      setErrorMessage('An error occurred undeleting the todo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ErrorMessage>{errorMessage}</ErrorMessage>
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
