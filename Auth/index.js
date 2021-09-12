import axios from 'axios';
import React from 'react';
import baseUrl from '../baseUrl';
import {useToken} from '../token';
import PaperLoginForm from './PaperLoginForm';
import oauthLogin from './oauthLogin';

const httpClient = axios.create({baseURL: baseUrl});

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
