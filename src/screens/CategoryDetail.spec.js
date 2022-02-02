import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import authenticatedHttpClient from '../data/authenticatedHttpClient';
import {TokenProvider} from '../data/token';
import CategoryDetail from './CategoryDetail';

jest.mock('../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useLinkTo: jest.fn(),
}));

describe('CategoryDetail', () => {
  describe('for a new category', () => {
    const name = 'New Category';

    function setUp({response} = {}) {
      const linkTo = jest.fn();
      useLinkTo.mockReturnValue(linkTo);

      const client = {
        post: jest.fn(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      if (response) {
        client.post.mockResolvedValue(response);
      }

      const route = {params: {id: 'new'}};
      const {getByTestId} = render(
        <TokenProvider loadToken={false}>
          <CategoryDetail route={route} />
        </TokenProvider>,
      );

      return {getByTestId, client, linkTo};
    }

    it('allows creating the category', async () => {
      const request = [
        'categories?',
        {data: {attributes: {name: 'New Category'}, type: 'categories'}},
        {headers: {'Content-Type': 'application/vnd.api+json'}},
      ];
      const response = {
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
      };

      const {getByTestId, client, linkTo} = setUp({response});

      fireEvent.changeText(getByTestId('name-field'), name);
      fireEvent.press(getByTestId('save-button'));

      await waitFor(() => {
        expect(client.post).toHaveBeenCalledWith(...request);
        expect(linkTo).toHaveBeenCalledWith('/categories');
      });
    });

    it('allows cancelling creation', async () => {
      const {getByTestId, client, linkTo} = setUp();

      fireEvent.changeText(getByTestId('name-field'), name);
      fireEvent.press(getByTestId('cancel-button'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
        expect(client.post).not.toHaveBeenCalled();
      });
    });
  });
});
