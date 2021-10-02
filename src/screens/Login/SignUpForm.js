import React, {useState} from 'react';
import {Appbar, Button, Text, TextInput, Title} from 'react-native-paper';
import {useUsers} from '../../data/users';

export default function SignUpForm({onCancel, onSignUpSuccess}) {
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
      <Appbar.Header>
        <Appbar.Content title="Surely" />
      </Appbar.Header>
      <Title>Sign up</Title>
      {error && <Text>{error}</Text>}
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
      <Button mode="outlined" testID="cancel-button" onPress={onCancel}>
        Cancel
      </Button>
      <Button mode="contained" testID="sign-up-button" onPress={handleSignUp}>
        Sign up
      </Button>
    </>
  );
}
