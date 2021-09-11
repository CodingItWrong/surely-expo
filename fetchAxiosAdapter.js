const fetchAxiosAdapter = {
  create: baseURL => ({
    post: async (path, body) => {
      const rawResponse = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      const data = await rawResponse.json();
      const response = {data};
      if (rawResponse.status >= 300) {
        throw {response};
      }
      return response;
    },
  }),
};

export default fetchAxiosAdapter;
