import {Button} from '@codingitwrong/react-native-paper';
import {useState} from 'react';
import {useStyleQueries} from 'react-native-style-queries';
import ButtonGroup from '../../../../components/ButtonGroup';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useTodos} from '../../../../data/todos';
import sharedStyleQueries from '../../../../sharedStyleQueries';

export default function Default({todo, onUpdate, onGoBack, onDefer}) {
  const styles = useStyleQueries(sharedStyleQueries);
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
      <ButtonGroup>
        {isDeleted ? (
          <Button
            testID="undelete-button"
            mode="outlined"
            onPress={handleUndelete}
            style={styles.button}
            disabled={isLoading}
            accessibilityLabel="Undelete"
          >
            Undelete
          </Button>
        ) : (
          <>
            <Button
              testID="delete-button"
              mode="outlined"
              onPress={handleDelete}
              style={styles.button}
              disabled={isLoading}
              accessibilityLabel="Delete"
            >
              Delete
            </Button>
            <Button
              testID="defer-button"
              mode="outlined"
              onPress={onDefer}
              style={styles.button}
              disabled={isLoading}
              accessibilityLabel="Defer"
            >
              Defer
            </Button>
            {isCompleted ? (
              <Button
                testID="uncomplete-button"
                mode="contained"
                icon="checkbox-marked"
                onPress={handleUncomplete}
                style={styles.button}
                disabled={isLoading}
                accessibilityLabel="Uncomplete"
              >
                Uncomplete
              </Button>
            ) : (
              <Button
                testID="complete-button"
                mode="contained"
                icon="checkbox-marked"
                onPress={handleComplete}
                style={styles.button}
                disabled={isLoading}
                accessibilityLabel="Complete"
              >
                Complete
              </Button>
            )}
          </>
        )}
      </ButtonGroup>
    </>
  );
}
