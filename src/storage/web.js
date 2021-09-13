// WARNING: using localStorage to store keys has significant security risks.
// It is safer to host a React app in a server-rendered webapp and store tokens
// in cookie-secured sessions.

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
