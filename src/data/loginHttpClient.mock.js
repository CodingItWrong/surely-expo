export default {
  post() {
    return Promise.resolve({
      data: {access_token: 'mock_access_token'},
    });
  },
};
