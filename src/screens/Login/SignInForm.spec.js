import {fireEvent, render, waitFor} from '@testing-library/react-native';
import nock from 'nock';
import {useToken} from '../../data/token';
import SignInForm from './SignInForm';

jest.mock('../../data/token', () => ({useToken: jest.fn()}));

describe('SignInForm', () => {
  const email = 'example@example.com';
  const password = 'password';
  const testToken = 'test_token';

  it('sets the token upon successful login', async () => {
    const mockedServer = nock('http://localhost:3000')
      .post('/oauth/token', {
        grant_type: 'password',
        username: email,
        password,
      })
      .reply(200, {access_token: testToken});

    const setToken = jest.fn();
    useToken.mockReturnValue({setToken});

    const {getByTestId} = render(<SignInForm />);

    fireEvent.changeText(getByTestId('email-field'), email);
    fireEvent.changeText(getByTestId('password-field'), password);
    fireEvent.press(getByTestId('sign-in-button'));

    await waitFor(() => expect(setToken).toHaveBeenCalledWith(testToken));

    mockedServer.done();
  });
});