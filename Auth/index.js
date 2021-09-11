import React from 'react';
import {Platform} from 'react-native';
import fetchAxiosAdapter from '../fetchAxiosAdapter';
import {useToken} from '../token';
import PaperLoginForm from './PaperLoginForm';
import oauthLogin from './oauthLogin';

const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const httpClient = fetchAxiosAdapter.create(baseURL);

export default function OAuthLoginForm({children}) {
  const {isTokenLoaded, token, setToken, clearToken} = useToken();
  const handleLogIn = ({username, password}) =>
    oauthLogin({
      httpClient,
      username,
      password,
    }).then(setToken);

  const logOut = clearToken;

  if (!isTokenLoaded) {
    return null;
  } else if (!token) {
    return <PaperLoginForm onLogIn={handleLogIn} />;
  } else {
    return children({logOut});
  }
}
