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

    const {findByText, getByLabelText, getByText, queryByText} = render(
      <TokenProvider loadToken={false}>
        <SignUpForm />
      </TokenProvider>,
    );

    return {
      findByText,
      getByLabelText,
      getByText,
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

    const {findByText, getByLabelText, getByText, client, linkTo} = setUp({
      response,
    });

    fireEvent.changeText(getByLabelText('Email'), email);
    fireEvent.changeText(getByLabelText('Password'), password);
    fireEvent.changeText(getByLabelText('Confirm password'), password);
    fireEvent.press(getByText('Sign up'));

    await findByText(
      'Sign up successful. Sign in with the email and password you used to sign up.',
    );
    expect(client.post).toHaveBeenCalledWith(...request);

    fireEvent.press(getByText('Go to sign in'));

    expect(linkTo).toHaveBeenCalledWith('/signin');
  });

  it('validates sign up form data', () => {
    const email = 'example@example.com';
    const password = 'password';

    const {getByLabelText, getByText, queryByText} = setUp();

    const signUpButton = getByText('Sign up');
    fireEvent.press(signUpButton);

    expect(queryByText('Email is required.')).not.toBeNull();

    fireEvent.changeText(getByLabelText('Email'), email);
    fireEvent.press(signUpButton);
    expect(queryByText('Password is required.')).not.toBeNull();

    fireEvent.changeText(getByLabelText('Password'), password);
    fireEvent.press(signUpButton);
    expect(queryByText('Password confirmation is required.')).not.toBeNull();

    fireEvent.changeText(getByLabelText('Confirm password'), 'incorrect');
    fireEvent.press(signUpButton);
    expect(queryByText('Passwords do not match.')).not.toBeNull();
  });

  it('allows cancelling signup', async () => {
    const {getByText, linkTo} = setUp();

    fireEvent.press(getByText('Cancel'));

    await waitFor(() => {
      expect(linkTo).toHaveBeenCalledWith('/signin');
    });
  });
});
