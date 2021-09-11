import * as SecureStore from 'expo-secure-store';

export function setStringAsync(key, value) {
  return SecureStore.setItemAsync(key, value);
}

export function getStringAsync(key) {
  return SecureStore.getItemAsync(key);
}

export function deleteStringAsync(key) {
  return SecureStore.deleteItemAsync(key);
}
