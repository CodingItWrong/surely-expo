import axios from 'axios';
import baseUrl from './baseUrl';

const axiosClient = axios.create({baseURL: baseUrl});

const contentTypeHeader = {'Content-Type': 'application/vnd.api+json'};

const api = {
  get: (url, config) =>
    axiosClient.get(url, config).then(response => response.data),
  post: (url, data, config) =>
    axiosClient
      .post(url, data, {
        ...config,
        headers: {...contentTypeHeader, ...config.headers},
      })
      .then(response => response.data),
  patch: (url, data, config) =>
    axiosClient
      .patch(url, data, {
        ...config,
        headers: {...contentTypeHeader, ...config.headers},
      })
      .then(response => response.data),
};

export default api;
