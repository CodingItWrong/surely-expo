export default function authenticatedHttpClient() {
  return {
    get() {
      return Promise.resolve({data: {}});
    },
  };
}
