import {useLinkTo} from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
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

    render(
      <TokenProvider loadToken={false}>
        <SignUpForm />
      </TokenProvider>,
    );

    return {
      linkTo,
    };
  }

  it('allows signing up', async () => {
    const email = 'example@example.com';
    const password = 'password';

    const mockedServer = nock('http://localhost:3000')
      .post('/users?', {data: {type: 'users', attributes: {email, password}}})
      .reply(200, {data: {}});

    const {linkTo} = setUp();

    fireEvent.changeText(screen.getByLabelText('Email'), email);
    fireEvent.changeText(screen.getByLabelText('Password'), password);
    fireEvent.changeText(screen.getByLabelText('Confirm password'), password);
    fireEvent.press(screen.getByText('Sign up'));

    await screen.findByText(
      'Sign up successful. Sign in with the email and password you used to sign up.',
    );

    fireEvent.press(screen.getByText('Go to sign in'));

    expect(linkTo).toHaveBeenCalledWith('/signin');

    mockedServer.done();
  });

  it('validates sign up form data', () => {
    const email = 'example@example.com';
    const password = 'password';

    setUp();

    const signUpButton = screen.getByText('Sign up');
    fireEvent.press(signUpButton);

    expect(screen.queryByText('Email is required.')).not.toBeNull();

    fireEvent.changeText(screen.getByLabelText('Email'), email);
    fireEvent.press(signUpButton);
    expect(screen.queryByText('Password is required.')).not.toBeNull();

    fireEvent.changeText(screen.getByLabelText('Password'), password);
    fireEvent.press(signUpButton);
    expect(
      screen.queryByText('Password confirmation is required.'),
    ).not.toBeNull();

    fireEvent.changeText(
      screen.getByLabelText('Confirm password'),
      'incorrect',
    );
    fireEvent.press(signUpButton);
    expect(screen.queryByText('Passwords do not match.')).not.toBeNull();
  });

  it('allows cancelling signup', async () => {
    const {linkTo} = setUp();

    fireEvent.press(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(linkTo).toHaveBeenCalledWith('/signin');
    });
  });
});
