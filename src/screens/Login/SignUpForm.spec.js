import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {TokenProvider} from '../../data/token';
import SignUpForm from './SignUpForm';

jest.mock('@react-navigation/native', () => ({
  useLinkTo: jest.fn(),
}));

describe('SignUpForm', () => {
  function setUp() {
    const linkTo = jest.fn();
    useLinkTo.mockReturnValue(linkTo);

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
      linkTo,
    };
  }

  it('allows signing up', async () => {
    const email = 'example@example.com';
    const password = 'password';

    const mockedServer = nock('http://localhost:3000')
      .post('/users?', {data: {type: 'users', attributes: {email, password}}})
      .reply(200, {data: {}});

    const {findByText, getByLabelText, getByText, linkTo} = setUp();

    fireEvent.changeText(getByLabelText('Email'), email);
    fireEvent.changeText(getByLabelText('Password'), password);
    fireEvent.changeText(getByLabelText('Confirm password'), password);
    fireEvent.press(getByText('Sign up'));

    await findByText(
      'Sign up successful. Sign in with the email and password you used to sign up.',
    );

    fireEvent.press(getByText('Go to sign in'));

    expect(linkTo).toHaveBeenCalledWith('/signin');

    mockedServer.done();
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
