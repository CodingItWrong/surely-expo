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
      const {queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await waitFor(() => {
        expect(
          queryByText('An error occurred loading the todo.'),
        ).not.toBeNull();
        expect(client.get).toHaveBeenCalledWith(
          `todos/${todoId}?include=category`,
        );
      });
    });

    it('clears the error upon successful retry', async () => {
      const client = {
        get: jest.fn().mockRejectedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      const todoId = '42';
      const route = {params: {id: todoId}};
      const {getByTestId, queryByText} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} />
        </TokenProvider>,
      );

      await waitFor(() =>
        expect(
          queryByText('An error occurred loading the todo.'),
        ).not.toBeNull(),
      );

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

      fireEvent.press(getByTestId('retry-button'));

      await waitFor(() => {
        expect(queryByText('My Available Todo')).not.toBeNull();
        expect(queryByText('An error occurred loading the todo.')).toBeNull();
      });
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
        'deferred-until': null,
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
        const {getByTestId} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await waitFor(() => getByTestId('complete-button'));

        fireEvent.press(getByTestId('complete-button'));

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
        const {findByText, findByTestId, getByTestId} = render(
          <TokenProvider loadToken={false}>
            <AvailableTodoDetail route={route} navigation={navigation} />
          </TokenProvider>,
        );

        await findByTestId('complete-button');
        fireEvent.press(getByTestId('complete-button'));

        await findByText('An error occurred marking the todo complete.');
        expect(navigation.navigate).not.toHaveBeenCalled();
      });
    });

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
      const {getByTestId} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await waitFor(() => getByTestId('delete-button'));

      fireEvent.press(getByTestId('delete-button'));

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

    it('allows deferring the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockResolvedValue({data: {data: todo}}), // TODO: could test rejected
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {getByTestId} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await waitFor(() => getByTestId('defer-button'));

      fireEvent.press(getByTestId('defer-button'));
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

    it('allows uncompleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockResolvedValue({data: {data: todo}}), // TODO: could test rejected
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {getByTestId} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await waitFor(() => getByTestId('uncomplete-button'));

      fireEvent.press(getByTestId('uncomplete-button'));

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
        'deleted-at': '2021-08-27T23:54:49.483Z',
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

    it('allows undeleting the todo', async () => {
      const client = {
        get: jest.fn().mockResolvedValue({
          data: {data: todo},
        }),
        patch: jest.fn().mockResolvedValue({data: {data: todo}}), // TODO: could test rejected
      };
      authenticatedHttpClient.mockReturnValue(client);

      const navigation = {
        navigate: jest.fn(),
      };

      const route = {params: {id: todo.id}};
      const {getByTestId} = render(
        <TokenProvider loadToken={false}>
          <AvailableTodoDetail route={route} navigation={navigation} />
        </TokenProvider>,
      );

      await waitFor(() => getByTestId('undelete-button'));

      fireEvent.press(getByTestId('undelete-button'));

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
  });
});
