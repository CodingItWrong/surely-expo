import {useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {screenWidthMin, useStyleQueries} from 'react-native-style-queries';
import ErrorMessage from '../../../../components/ErrorMessage';
import {useTodos} from '../../../../data/todos';

export default function Default({todo, onUpdate, onGoBack, onDefer}) {
  const styles = useStyleQueries(styleQueries);
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
      <View style={styles.buttonContainer}>
        {isDeleted ? (
          <Button
            testID="undelete-button"
            mode="outlined"
            onPress={handleUndelete}
            style={styles.button}
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
              style={styles.button}
              disabled={isLoading}
            >
              Delete
            </Button>
            <Button
              testID="defer-button"
              mode="outlined"
              onPress={onDefer}
              style={styles.button}
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
                style={styles.button}
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
                style={styles.button}
                disabled={isLoading}
              >
                Complete
              </Button>
            )}
          </>
        )}
      </View>
    </>
  );
}

const styleQueries = {
  buttonContainer: [
    {
      flexDirection: 'column',
    },
    screenWidthMin(429, {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }),
  ],
  button: [
    {
      marginTop: 10,
    },
    screenWidthMin(429, {
      marginLeft: 10,
    }),
  ],
};
