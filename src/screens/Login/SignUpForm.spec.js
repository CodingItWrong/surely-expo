import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import authenticatedHttpClient from '../../data/authenticatedHttpClient';
import {TokenProvider} from '../../data/token';
import SignUpForm from './SignUpForm';

jest.mock('../../data/authenticatedHttpClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useLinkTo: jest.fn(),
}));

describe('SignUpForm', () => {
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

    const {getByTestId, queryByTestId} = render(
      <TokenProvider loadToken={false}>
        <SignUpForm />
      </TokenProvider>,
    );

    return {getByTestId, queryByTestId, client, linkTo};
  }

  it('allows signing up', async () => {
    const email = 'example@example.com';
    const password = 'password';

    const request = [
      'users?',
      {data: {type: 'users', attributes: {email, password}}},
      {headers: {'Content-Type': 'application/vnd.api+json'}},
    ];
    const response = {data: {}};

    const {getByTestId, queryByTestId, client, linkTo} = setUp({response});

    fireEvent.changeText(getByTestId('email-field'), email);
    fireEvent.changeText(getByTestId('password-field'), password);
    fireEvent.changeText(getByTestId('password-confirmation-field'), password);
    fireEvent.press(getByTestId('submit-sign-up-button'));

    await waitFor(() => {
      expect(queryByTestId('sign-up-successful-message')).not.toBeNull();
      expect(client.post).toHaveBeenCalledWith(...request);
    });

    fireEvent.press(getByTestId('go-to-sign-in-button'));

    expect(linkTo).toHaveBeenCalledWith('/signin');
  });

  it('allows cancelling signup', async () => {
    const {getByTestId, client, linkTo} = setUp();

    fireEvent.press(getByTestId('cancel-button'));

    await waitFor(() => {
      expect(linkTo).toHaveBeenCalledWith('/signin');
    });
  });
});
