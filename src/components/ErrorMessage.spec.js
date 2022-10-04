import {render, screen} from '@testing-library/react-native';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders a provided error message', () => {
    const errorMessage = 'This is an error message!';

    render(<ErrorMessage>{errorMessage}</ErrorMessage>);

    expect(screen.getByRole('alert', {name: errorMessage})).toBeTruthy();
    expect(screen.queryByTestId('error-message')).toBeTruthy();
  });

  it('does not render any elements when the error message is falsy', () => {
    const nullErrorMessage = null;

    render(<ErrorMessage>{nullErrorMessage}</ErrorMessage>);

    // TODO: check that nothing is rendered
    expect(screen.queryByTestId('error-message')).toBeNull();
  });
});
