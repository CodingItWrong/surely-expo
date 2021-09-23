import React from 'react';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import useLoginForm from './useLoginForm';

export default function PaperLoginForm({onLogIn}) {
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Surely" />
      </Appbar.Header>
      {error && <Text>{error}</Text>}
      <TextInput
        testID="email"
        label="Email"
        value={username}
        onChangeText={handleChange('username')}
        onSubmitEditing={handleLogIn}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        testID="password"
        label="Password"
        value={password}
        onChangeText={handleChange('password')}
        onSubmitEditing={handleLogIn}
        secureTextEntry
      />
      <Button testID="sign-in" onPress={handleLogIn}>
        Sign in
      </Button>
    </>
  );
}
