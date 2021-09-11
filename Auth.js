import {OAuth} from '@codingitwrong/react-login';
import axios from 'axios';
import React from 'react';
import {Platform} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {useToken} from './token';

const Auth = ({children}) => {
  const {isTokenLoaded, token, setToken, clearToken} = useToken();

  const initiallyLoggedIn = !!token;

  if (!isTokenLoaded) {
    return null;
  }

  return (
    <OAuth
      initiallyLoggedIn={initiallyLoggedIn}
      httpClient={httpClient}
      handleAccessToken={setToken}
      renderForm={renderForm}
      renderLoggedIn={renderLoggedIn({children, clearToken})}
    />
  );
};

export default Auth;

const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const httpClient = axios.create({baseURL});

const renderForm = ({username, password, error, handleChange, handleLogIn}) => (
  <>
    <Appbar.Header>
      <Appbar.Content title="Surely" />
    </Appbar.Header>
    {error && <Text>{error}</Text>}
    <TextInput
      label="Email"
      value={username}
      onChangeText={handleChange('username')}
      onSubmitEditing={handleLogIn}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    <TextInput
      label="Password"
      value={password}
      onChangeText={handleChange('password')}
      onSubmitEditing={handleLogIn}
      secureTextEntry
    />
    <Button onPress={handleLogIn}>Sign in</Button>
  </>
);

const renderLoggedIn =
  ({children, clearToken}) =>
  props => {
    const {logOut, ...rest} = props;

    const handleLogOut = () => clearToken().then(logOut);

    return children({logOut: handleLogOut, ...rest});
  };
