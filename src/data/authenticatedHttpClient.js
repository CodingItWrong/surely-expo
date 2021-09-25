import axios from 'axios';
import baseUrl from '../baseUrl';

export default function authenticatedHttpClient({token}) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: baseUrl,
    headers,
  });
}
