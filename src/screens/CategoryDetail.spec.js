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
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

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

  describe('for an existing category', () => {
    const category = {
      id: 'cat1',
      type: 'categories',
      attributes: {
        name: 'Category C',
        'sort-order': 3,
      },
    };

    function setUp({response, deleteError = null} = {}) {
      const linkTo = jest.fn();
      useLinkTo.mockReturnValue(linkTo);

      const client = {
        get: () => Promise.resolve({data: {data: category}}),
        patch: jest.fn(),
        delete: jest.fn().mockResolvedValue(),
      };
      authenticatedHttpClient.mockReturnValue(client);

      if (deleteError) {
        client.delete.mockRejectedValue(deleteError);
      } else {
        client.delete.mockResolvedValue();
      }

      if (response) {
        client.patch.mockResolvedValue(response);
      }

      const route = {params: {id: category.id}};
      const {getByTestId, queryByText} = render(
        <TokenProvider loadToken={false}>
          <CategoryDetail route={route} />
        </TokenProvider>,
      );

      return {getByTestId, queryByText, client, linkTo};
    }

    it('allows editing the category', async () => {
      const updatedName = 'Updated Name';
      const request = [
        'categories/cat1?',
        {
          data: {
            type: 'categories',
            id: category.id,
            attributes: {name: updatedName},
          },
        },
        {headers: {'Content-Type': 'application/vnd.api+json'}},
      ];
      const response = {data: category};

      const {getByTestId, linkTo, client} = setUp({response});

      await waitFor(() => getByTestId('delete-button'));

      fireEvent.changeText(getByTestId('name-field'), updatedName);
      fireEvent.press(getByTestId('save-button'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
        expect(client.patch).toHaveBeenCalledWith(...request);
      });
    });

    it('allows deleting the category', async () => {
      const {getByTestId, linkTo, client} = setUp();

      await waitFor(() => getByTestId('delete-button'));

      fireEvent.press(getByTestId('delete-button'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
        expect(client.delete).toHaveBeenCalledWith('categories/cat1');
      });
    });

    it('shows a message upon error deleting the category', async () => {
      const deleteError = 'deleteError';
      const {getByTestId, queryByText, linkTo} = setUp({deleteError});

      await waitFor(() => getByTestId('delete-button'));

      fireEvent.press(getByTestId('delete-button'));

      await waitFor(() => {
        expect(
          queryByText('An error occurred deleting the category.'),
        ).not.toBeNull();
        expect(console.error).toHaveBeenCalledWith(deleteError);
        expect(linkTo).not.toHaveBeenCalled();
      });
    });
  });
});
