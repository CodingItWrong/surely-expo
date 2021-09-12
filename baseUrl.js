import {Platform} from 'react-native';

console.log('__DEV__', __DEV__);

function getBaseUrl() {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    } else {
      return 'http://localhost:3000';
    }
  } else {
    return 'https://api.surelytodo.com';
  }
}

const baseUrl = getBaseUrl();

export default baseUrl;
