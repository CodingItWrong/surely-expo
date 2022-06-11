import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {TokenProvider} from '../data/token';
import CategoryDetail from './CategoryDetail';

jest.mock('@react-navigation/native', () => ({
  useLinkTo: jest.fn(),
}));

describe('CategoryDetail', () => {
  describe('for a new category', () => {
    const name = 'New Category';

    function setUp() {
      const linkTo = jest.fn();
      useLinkTo.mockReturnValue(linkTo);

      const route = {params: {id: 'new'}};
      const {getByLabelText, getByText} = render(
        <TokenProvider loadToken={false}>
          <CategoryDetail route={route} />
        </TokenProvider>,
      );

      return {getByLabelText, getByText, linkTo};
    }

    it('allows creating the category', async () => {
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
      const mockedServer = nock('http://localhost:3000')
        .post('/categories?', {
          data: {attributes: {name: 'New Category'}, type: 'categories'},
        })
        .reply(200, response);

      const {getByLabelText, getByText, linkTo} = setUp({
        response,
      });

      fireEvent.changeText(getByLabelText('Category name'), name);
      fireEvent.press(getByText('Save'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
      });

      mockedServer.done();
    });

    it('allows cancelling creation', async () => {
      const {getByLabelText, getByText, linkTo} = setUp();

      fireEvent.changeText(getByLabelText('Category name'), name);
      fireEvent.press(getByText('Cancel'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
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

    function setUp({response, deleteError = null, saveError = null} = {}) {
      const linkTo = jest.fn();
      useLinkTo.mockReturnValue(linkTo);

      const mockedServer = nock('http://localhost:3000')
        .get(`/categories/${category.id}?`)
        .reply(200, {data: category});

      // const client = {
      //   get: () => Promise.resolve({data: {data: category}}),
      //   patch: jest.fn(),
      //   delete: jest.fn().mockResolvedValue(),
      // };
      // authenticatedHttpClient.mockReturnValue(client);

      // if (saveError) {
      //   client.patch.mockRejectedValue(saveError);
      // }

      // if (response) {
      //   client.patch.mockResolvedValue(response);
      // }

      // if (deleteError) {
      //   client.delete.mockRejectedValue(deleteError);
      // } else {
      //   client.delete.mockResolvedValue();
      // }

      const route = {params: {id: category.id}};
      const {findByText, getByLabelText, getByText, queryByText} = render(
        <TokenProvider loadToken={false}>
          <CategoryDetail route={route} />
        </TokenProvider>,
      );

      return {
        findByText,
        getByLabelText,
        getByText,
        mockedServer,
        queryByText,
        linkTo,
      };
    }

    it('displays the category name', async () => {
      const {getByLabelText} = setUp();
      await waitFor(() =>
        expect(getByLabelText('Category name')).toHaveProp(
          'value',
          'Category C',
        ),
      );
    });

    it('allows editing the category', async () => {
      const updatedName = 'Updated Name';

      const {findByText, getByLabelText, getByText, linkTo, mockedServer} =
        setUp();

      mockedServer
        .patch('/categories/cat1?', {
          data: {
            type: 'categories',
            id: category.id,
            attributes: {name: updatedName},
          },
        })
        .reply(200, {data: category});

      await findByText('Delete');

      fireEvent.changeText(getByLabelText('Category name'), updatedName);
      fireEvent.press(getByText('Save'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
      });

      mockedServer.done();
    });

    it('shows a message upon error saving edits to the category', async () => {
      const saveError = 'saveError';
      const updatedName = 'Updated Name';

      const {findByText, getByLabelText, linkTo, mockedServer} = setUp();

      mockedServer.patch('/categories/cat1?').reply(500, saveError);

      const saveButton = await findByText('Save');
      fireEvent.changeText(getByLabelText('Category name'), updatedName);
      fireEvent.press(saveButton);

      await findByText('An error occurred saving the category.');
      expect(linkTo).not.toHaveBeenCalled();
    });

    it('allows deleting the category', async () => {
      const {findByText, linkTo, mockedServer} = setUp();

      mockedServer.delete('/categories/cat1?').reply(200, {});

      fireEvent.press(await findByText('Delete'));

      await waitFor(() => {
        expect(linkTo).toHaveBeenCalledWith('/categories');
      });

      mockedServer.done();
    });

    it('shows a message upon error deleting the category', async () => {
      const deleteError = 'deleteError';

      const {findByText, linkTo, mockedServer} = setUp({
        deleteError,
      });

      mockedServer.delete('/categories/cat1?').reply(500, deleteError);

      fireEvent.press(await findByText('Delete'));

      await findByText('An error occurred deleting the category.');
      expect(linkTo).not.toHaveBeenCalled();
    });
  });
});
