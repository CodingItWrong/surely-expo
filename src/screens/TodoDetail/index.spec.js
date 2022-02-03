import {render, waitFor} from '@testing-library/react-native';
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
  });
});
