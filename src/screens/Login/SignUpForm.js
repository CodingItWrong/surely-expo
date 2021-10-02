import React, {useState} from 'react';
import {Appbar, Button, TextInput, Title} from 'react-native-paper';
import {useUsers} from '../../data/users';

export default function SignUpForm({onCancel, onSignUpSuccess}) {
  const userClient = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () =>
    userClient
      .create({attributes: {email, password}})
      .then(onSignUpSuccess)
      .catch(console.error);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Surely" />
      </Appbar.Header>
      <Title>Sign up</Title>
      <TextInput
        testID="email"
        label="Email"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={handleSignUp}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        testID="password"
        label="Password"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignUp}
        secureTextEntry
      />
      <TextInput
        testID="password"
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
