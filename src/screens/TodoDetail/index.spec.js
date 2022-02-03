import {fireEvent, render, waitFor} from '@testing-library/react-native';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import {createTodoDetail} from './index';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TodoDetail', () => {
  const AvailableTodoDetail = createTodoDetail('AvailableTodos');

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
});
