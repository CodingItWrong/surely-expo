import {Platform} from 'react-native';

function getBaseUrl() {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    } else {
      return 'http://10.0.1.5:3000';
    }
  } else {
    return 'https://api.surelytodo.com';
  }
}

const baseUrl = getBaseUrl();

export default baseUrl;
