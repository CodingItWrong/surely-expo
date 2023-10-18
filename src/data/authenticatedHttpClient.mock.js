const todos = [];
let nextId = 1;

export default function authenticatedHttpClient() {
  return {
    async get(url) {
      console.log(url);
      if (url.startsWith('todos?')) {
        const data = todos.filter(({attributes}) => {
          const now = new Date();

          if (/available/.test(url)) {
            return (
              attributes['completed-at'] == null &&
              attributes['deleted-at'] == null &&
              attributes['deferred-until'] == null
            );
          } else if (/completed/.test(url)) {
            return (
              attributes['completed-at'] != null &&
              attributes['deleted-at'] == null
            );
          } else if (/tomorrow/.test(url)) {
            const d = attributes['deferred-until'];
            return (
              attributes['completed-at'] == null &&
              attributes['deleted-at'] == null &&
              d != null &&
              d.getFullYear() === now.getFullYear() &&
              d.getMonth() === now.getMonth() &&
              d.getDate() === now.getDate() + 1
              // NOTE: will fail on month boundaries
            );
          } else if (/future/.test(url)) {
            const d = attributes['deferred-until'];
            return (
              attributes['completed-at'] == null &&
              attributes['deleted-at'] == null &&
              d != null &&
              (d.getFullYear() !== now.getFullYear() ||
                d.getMonth() !== now.getMonth() ||
                d.getDate() > now.getDate() + 1)
            );
          } else if (/deleted/.test(url)) {
            return attributes['deleted-at'] != null;
          }
        });

        return {
          data: {
            data,
            meta: {'page-count': Math.ceil(todos.length / 10)},
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
        todos[0].attributes = {
          ...todos[0].attributes,
          ...body.data.attributes,
        };
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
