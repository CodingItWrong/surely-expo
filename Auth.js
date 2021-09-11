import {OAuth} from '@codingitwrong/react-login';
import axios from 'axios';
import React from 'react';
import {Platform} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {setToken} from './store';

const Auth = ({children}) => (
  <OAuth
    initiallyLoggedIn={false}
    httpClient={httpClient}
    handleAccessToken={setToken}
    renderForm={renderForm}
    renderLoggedIn={children}
  />
);

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
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
    />
    <TextInput
      label="Password"
      value={password}
      onChangeText={handleChange('password')}
      secureTextEntry
    />
    <Button onPress={handleLogIn}>Sign in</Button>
  </>
);
