import * as SecureStore from 'expo-secure-store';

const nativeStorage = {
  setStringAsync(key, value) {
    return SecureStore.setItemAsync(key, value);
  },

  getStringAsync(key) {
    return SecureStore.getItemAsync(key);
  },

  deleteStringAsync(key) {
    return SecureStore.deleteItemAsync(key);
  },
};

export default nativeStorage;
