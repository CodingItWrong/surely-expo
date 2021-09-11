const webStorage = {
  setStringAsync(key, value) {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },

  getStringAsync(key) {
    return Promise.resolve(window.localStorage.getItem(key));
  },

  deleteStringAsync(key) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export default webStorage;
