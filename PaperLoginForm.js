import React from 'react';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';

const PaperLoginForm = ({username, password, error, onChange, onLogIn}) => (
  <>
    <Appbar.Header>
      <Appbar.Content title="Surely" />
    </Appbar.Header>
    {error && <Text>{error}</Text>}
    <TextInput
      label="Email"
      value={username}
      onChangeText={onChange('username')}
      onSubmitEditing={onLogIn}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    <TextInput
      label="Password"
      value={password}
      onChangeText={onChange('password')}
      onSubmitEditing={onLogIn}
      secureTextEntry
    />
    <Button onPress={onLogIn}>Sign in</Button>
  </>
);

export default PaperLoginForm;
