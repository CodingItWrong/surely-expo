import {useLinkTo} from '@react-navigation/native';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {TokenProvider} from '../../data/token';
import SignUpForm from './SignUpForm';

jest.mock('@react-navigation/native', () => ({
  useLinkTo: jest.fn(),
}));

describe('SignUpForm', () => {
  it('allows cancelling signup', async () => {
    const linkTo = jest.fn();
    useLinkTo.mockReturnValue(linkTo);

    const {getByTestId} = render(
      <TokenProvider loadToken={false}>
        <SignUpForm />
      </TokenProvider>,
    );

    fireEvent.press(getByTestId('cancel-button'));

    await waitFor(() => {
      expect(linkTo).toHaveBeenCalledWith('/signin');
    });
  });
});
