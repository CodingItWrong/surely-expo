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

    const {findByTestId, getByTestId, queryByTestId, queryByText} = render(
      <TokenProvider loadToken={false}>
        <SignUpForm />
      </TokenProvider>,
    );

    return {
      findByTestId,
      getByTestId,
      queryByTestId,
      queryByText,
      client,
      linkTo,
    };
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

    const {findByTestId, getByTestId, client, linkTo} = setUp({response});

    fireEvent.changeText(getByTestId('email-field'), email);
    fireEvent.changeText(getByTestId('password-field'), password);
    fireEvent.changeText(getByTestId('password-confirmation-field'), password);
    fireEvent.press(getByTestId('submit-sign-up-button'));

    await findByTestId('sign-up-successful-message');
    expect(client.post).toHaveBeenCalledWith(...request);

    fireEvent.press(getByTestId('go-to-sign-in-button'));

    expect(linkTo).toHaveBeenCalledWith('/signin');
  });

  it('validates sign up form data', () => {
    const email = 'example@example.com';
    const password = 'password';

    const {getByTestId, queryByText} = setUp();

    const signUpButton = getByTestId('submit-sign-up-button');
    fireEvent.press(signUpButton);

    expect(queryByText('Email is required.')).not.toBeNull();

    fireEvent.changeText(getByTestId('email-field'), email);
    fireEvent.press(signUpButton);
    expect(queryByText('Password is required.')).not.toBeNull();

    fireEvent.changeText(getByTestId('password-field'), password);
    fireEvent.press(signUpButton);
    expect(queryByText('Password confirmation is required.')).not.toBeNull();

    fireEvent.changeText(
      getByTestId('password-confirmation-field'),
      'incorrect',
    );
    fireEvent.press(signUpButton);
    expect(queryByText('Passwords do not match.')).not.toBeNull();
  });

  it('allows cancelling signup', async () => {
    const {getByTestId, linkTo} = setUp();

    fireEvent.press(getByTestId('cancel-button'));

    await waitFor(() => {
      expect(linkTo).toHaveBeenCalledWith('/signin');
    });
  });
});
