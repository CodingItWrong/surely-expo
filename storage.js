import * as SecureStore from 'expo-secure-store';
import {Platform} from 'react-native';

const isWeb = Platform.OS === 'web';

export function setStringAsync(key, value) {
  if (isWeb) {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  } else {
    return SecureStore.setItemAsync(key, value);
  }
}

export function getStringAsync(key) {
  if (isWeb) {
    return Promise.resolve(window.localStorage.getItem(key));
  } else {
    return SecureStore.getItemAsync(key);
  }
}

export function deleteStringAsync(key) {
  if (isWeb) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  } else {
    return SecureStore.deleteItemAsync(key);
  }
}
