console.log('MOCK LOGIN CLIENT');

export default {
  post() {
    return Promise.resolve({
      data: {access_token: 'mock_access_token'},
    });
  },
};
