import {fireEvent, render, waitFor} from '@testing-library/react-native';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {createTodoDetail} from './index';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TodoDetail', () => {
  const parentRouteName = 'AvailableTodos';
  const AvailableTodoDetail = createTodoDetail(parentRouteName);

  describe('when there is an error loading the todo', () => {
    it('shows an error message', async () => {
      const client = {
        get: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const todoId = '42';
      const route = {params: {id: todoId}};
      const {findByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('An error occurred loading the todo.');
      expect(client.get).toHaveBeenCalledWith(
        `todos/${todoId}?include=category`,
      );
    });

    it('clears the error upon successful retry', async () => {
      const client = {
        get: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const todoId = '42';
      const route = {params: {id: todoId}};
      const {findByText, queryByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('An error occurred loading the todo.');

      client.get.mockResolvedValue({
        data: {
          data: {
            id: 'abc123',
            type: 'todos',
            attributes: {
              name: 'My Available Todo',
              notes: 'Notes for the todo',
              'created-at': '2021-08-27T23:54:49.483Z',
              'updated-at': '2021-08-27T23:54:49.483Z',
              'deleted-at': null,
              'completed-at': null,
              'deferred-at': null,
              'deferred-until': null,
            },
            relationships: {
              category: {
                data: null,
              },
            },
          },
        },
      });

      fireEvent.press(getByText('Retry'));

      await findByText('My Available Todo');
      expect(queryByText('An error occurred loading the todo.')).toBeNull();
    });
  });

  describe('when the todo is available', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': null,
        'completed-at': null,
        'deferred-at': null,
        'deferred-until': '2121-08-27T23:54:49.483Z',
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    it('displays the todo content', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const route = {params: {id: todo.id}};
      const {findByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText(todo.attributes.name);
      expect(queryByText(todo.attributes.notes)).not.toBeNull();
      expect(queryByText('Created 08/27/2021')).not.toBeNull();
      expect(queryByText('Deferred until 08/27/2121')).not.toBeNull();
    });

    describe.skip('editing the todo', () => {
      it('allows editing the todo', async () => {
        const notes = 'Updated Notes';
        const categories = [
          {
            id: 'cat1',
            type: 'categories',
            attributes: {
              name: 'Category C',
              'sort-order': 3,
            },
          },
          {
            id: 'cat2',
            type: 'categories',
            attributes: {
              name: 'Category B',
              'sort-order': 2,
            },
          },
        ];

        const client = {
          async get(url) {
            if (url.startsWith('todos')) {
              return {data: {data: todo}};
            } else if (url.startsWith('categories')) {
              return {data: {data: categories}};
            }
          },
          patch: jest.fn().mockResolvedValue({data: {data: todo}}),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByTestId, getByTestId} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByTestId('edit-button');
        fireEvent.press(getByTestId('edit-button'));

        // fireEvent.changeText(getByTestId('name-field'), name);
        // fireEvent.changeText(getByTestId('notes-field'), notes);
        // // TODO: choose category
        // // cy.getTestId('choose-category-field').click();
        // // cy.contains('Category B').click({force: true});
        // fireEvent.press(getByTestId('save-button'));

        // await waitFor(() => {
        //   expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName);
        //   expect(client.patch).toHaveBeenCalledWith(
        //     `todos/${todo.id}?`,
        //     {
        //       data: {
        //         type: 'todos',
        //         id: todo.id,
        //         attributes: {name, notes},
        //       },
        //     },
        //     {headers: {'Content-Type': 'application/vnd.api+json'}},
        //   );
        // });
      });
    });

    describe('completing the todo', () => {
      it('allows completing the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockResolvedValue({data: {data: todo}}),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Complete');
        fireEvent.press(getByText('Complete'));

        await waitFor(() => {
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName);
          expect(client.patch).toHaveBeenCalledWith(
            `todos/${todo.id}?`,
            {
              data: {
                type: 'todos',
                id: todo.id,
                attributes: {'completed-at': expect.any(Date)},
              },
            },
            {headers: {'Content-Type': 'application/vnd.api+json'}},
          );
        });
      });

      it('shows a message when there is an error completing the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockRejectedValue(),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Complete');
        fireEvent.press(getByText('Complete'));

        await findByText('An error occurred marking the todo complete.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

    describe('deleting the todo', () => {
      it('allows deleting the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockResolvedValue({data: {data: todo}}), // patch because it's a soft delete
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Delete');
        fireEvent.press(getByText('Delete'));

        await waitFor(() => {
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName);
          expect(client.patch).toHaveBeenCalledWith(
            `todos/${todo.id}?`,
            {
              data: {
                type: 'todos',
                id: todo.id,
                attributes: {'deleted-at': expect.any(Date)},
              },
            },
            {headers: {'Content-Type': 'application/vnd.api+json'}},
          );
        });
      });

      it('shows a message when there is an error deleting the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockRejectedValue(),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Delete');
        fireEvent.press(getByText('Delete'));

        await findByText('An error occurred deleting the todo.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

    describe('deferring the todo', () => {
      it('allows deferring the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockResolvedValue({data: {data: todo}}),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByTestId, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Defer');
        fireEvent.press(getByText('Defer'));
        fireEvent.press(getByTestId('defer-1-day-button'));

        await waitFor(() => {
          expect(navigation.navigate).toHaveBeenCalledWith(parentRouteName);
          expect(client.patch).toHaveBeenCalledWith(
            `todos/${todo.id}?`,
            {
              data: {
                type: 'todos',
                id: todo.id,
                attributes: {'deferred-until': expect.any(Date)},
              },
            },
            {headers: {'Content-Type': 'application/vnd.api+json'}},
          );
        });
      });

      it('shows a message when an error occurs deferring the todo', async () => {
        const client = {
          get: jest.fn().mockResolvedValue({
            data: {data: todo},
          }),
          patch: jest.fn().mockRejectedValue(),
        };
        authenticatedHttpClient.mockReturnValue(client);

        const navigation = {
          navigate: jest.fn(),
        };

        const route = {params: {id: todo.id}};
        const {findByText, getByTestId, getByText} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByText('Defer');
        fireEvent.press(getByText('Defer'));
        fireEvent.press(getByTestId('defer-1-day-button'));

        await findByText('An error occurred deferring the todo.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the todo is completed', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': null,
        'completed-at': '2021-08-27T23:54:49.483Z',
        'deferred-at': null,
        'deferred-until': null,
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    it('displays the completion date', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const route = {params: {id: todo.id}};
      const {findByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('Completed 08/27/2021');
    });

    it('allows uncompleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockResolvedValue({data: {data: todo}}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await findByText('Uncomplete');
      fireEvent.press(getByText('Uncomplete'));

      await waitFor(() => {
        expect(navigation.navigate).not.toHaveBeenCalled();
        expect(client.patch).toHaveBeenCalledWith(
          `todos/${todo.id}?`,
          {
            data: {
              type: 'todos',
              id: todo.id,
              attributes: {'completed-at': null},
            },
          },
          {headers: {'Content-Type': 'application/vnd.api+json'}},
        );
      });
    });

    it('shows a message when there is an error uncompleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await findByText('Uncomplete');
      fireEvent.press(getByText('Uncomplete'));

      await findByText('An error occurred marking the todo incomplete.');
    });
  });

  describe('when the todo is deleted', () => {
    const todo = {
      id: 'abc123',
      type: 'todos',
      attributes: {
        name: 'My Available Todo',
        notes: 'Notes for the todo',
        'created-at': '2021-08-27T23:54:49.483Z',
        'updated-at': '2021-08-27T23:54:49.483Z',
        'deleted-at': '2021-08-29T23:54:49.483Z',
        'completed-at': '2021-08-28T23:54:49.483Z',
        'deferred-at': null,
        'deferred-until': null,
      },
      relationships: {
        category: {
          data: null,
        },
      },
    };

    it('displays the todo dates', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const route = {params: {id: todo.id}};
      const {findByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await findByText('Completed 08/28/2021');
      expect(queryByText('Deleted 08/29/2021')).not.toBeNull();
    });

    it('allows undeleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockResolvedValue({data: {data: todo}}),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await findByText('Undelete');
      fireEvent.press(getByText('Undelete'));

      await waitFor(() => {
        expect(navigation.navigate).not.toHaveBeenCalled();
        expect(client.patch).toHaveBeenCalledWith(
          `todos/${todo.id}?`,
          {
            data: {
              type: 'todos',
              id: todo.id,
              attributes: {
                'completed-at': null,
                'deleted-at': null,
              },
            },
          },
          {headers: {'Content-Type': 'application/vnd.api+json'}},
        );
      });
    });

    it('shows a message when there is an error undeleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {findByText, getByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await findByText('Undelete');
      fireEvent.press(getByText('Undelete'));

      await findByText('An error occurred undeleting the todo.');
    });
  });
});
