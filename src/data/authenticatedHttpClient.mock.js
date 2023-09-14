const todos = [];
let nextId = 1;

export default function authenticatedHttpClient() {
  return {
    async get(url) {
      if (url.startsWith('todos?')) {
        return {
          data: {
            data: todos,
          },
        };
      } else if (url.startsWith('todos/')) {
        return {
          data: {
            data: todos[0],
          },
        };
      } else {
        console.log(`unmocked url: ${url}`);
        return {data: {}};
      }
    },

    async post(url, body) {
      console.log(url, body);

      if (url === 'todos?') {
        const newTodo = {
          id: nextId,
          attributes: body.data.attributes,
          relationships: {category: {}},
        };
        nextId += 1;
        todos.push(newTodo);
        return {data: newTodo};
      } else {
        return {data: {}};
      }
    },

    async patch(url, body) {
      if (url.startsWith('todos/')) {
        todos[0].attributes = body.data.attributes;
        return {
          data: {
            data: todos[0],
          },
        };
      } else {
        return {data: {}};
      }
    },
  };
}
