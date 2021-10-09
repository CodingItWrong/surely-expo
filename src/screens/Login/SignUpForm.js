import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {useStyleQueries} from 'react-native-style-queries';
import ButtonGroup from '../../components/ButtonGroup';
import ErrorMessage from '../../components/ErrorMessage';
import {useUsers} from '../../data/users';
import sharedStyleQueries from '../../sharedStyleQueries';

export default function SignUpForm({onCancel, onSignUpSuccess}) {
  const responsiveStyles = useStyleQueries(sharedStyleQueries);
  const userClient = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  function validate() {
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (!passwordConfirmation) {
      setError('Password confirmation is required.');
      return false;
    } else if (passwordConfirmation !== password) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  }

  function handleSignUp() {
    if (!validate()) {
      return;
    }

    userClient
      .create({attributes: {email, password}})
      .then(onSignUpSuccess)
      .catch(errorResponse => {
        if (errorResponse?.data?.errors?.[0]?.detail) {
          setError(errorResponse?.data?.errors?.[0]?.detail);
        } else if (errorResponse?.message) {
          setError(errorResponse?.message);
        } else {
          setError('An error occurred. Please try again.');
          console.log(errorResponse);
        }
      });
  }

  return (
    <>
      <Title>Sign up</Title>
      <TextInput
        testID="email-field"
        label="Email"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={handleSignUp}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        testID="password-field"
        label="Password"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignUp}
        secureTextEntry
      />
      <TextInput
        testID="password-confirmation-field"
        label="Confirm password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        onSubmitEditing={handleSignUp}
        secureTextEntry
      />
      <ErrorMessage>{error}</ErrorMessage>
      <ButtonGroup>
        <Button
          mode="outlined"
          testID="cancel-button"
          onPress={onCancel}
          style={responsiveStyles.button}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          testID="sign-up-button"
          onPress={handleSignUp}
          style={responsiveStyles.button}
        >
          Sign up
        </Button>
      </ButtonGroup>
      <Text style={styles.freeMessage}>
        Accounts are free for now. If Surely gets popular we may need to make a
        change then 😃
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  freeMessage: {
    lineHeight: 25,
    marginTop: 20,
  },
});
