import {OAuth} from '@codingitwrong/react-login';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {deleteStringAsync, getStringAsync, setStringAsync} from './storage';
import {setToken} from './store';

const Auth = ({children}) => {
  const [loaded, setLoaded] = useState(false);
  const [initiallyLoggedIn, setInitiallyLoggedIn] = useState(false);

  useEffect(() => {
    loadAccessToken().then(loggedIn => {
      setInitiallyLoggedIn(loggedIn);
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <OAuth
      initiallyLoggedIn={initiallyLoggedIn}
      httpClient={httpClient}
      handleAccessToken={handleAccessToken}
      renderForm={renderForm}
      renderLoggedIn={renderLoggedIn(children)}
    />
  );
};

export default Auth;

const ACCESS_TOKEN_KEY = 'SURELY-ACCESS_TOKEN';

async function handleAccessToken(token) {
  await setStringAsync(ACCESS_TOKEN_KEY, token);
  setToken(token);
}

async function loadAccessToken() {
  const token = await getStringAsync(ACCESS_TOKEN_KEY);
  if (token) {
    setToken(token);
    return !!token;
  } else {
    return null;
  }
}

const clearAccessToken = () => deleteStringAsync(ACCESS_TOKEN_KEY);

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

const renderLoggedIn = children => props => {
  const {logOut, ...rest} = props;

  const handleLogOut = () => clearAccessToken().then(logOut);

  return children({logOut: handleLogOut, ...rest});
};
