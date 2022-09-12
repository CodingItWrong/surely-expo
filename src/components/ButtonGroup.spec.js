import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders its children', () => {
    render(
      <ButtonGroup>
        <Text>Hello, RNTL</Text>
      </ButtonGroup>,
    );

    expect(screen.queryByText('Hello, RNTL')).toBeTruthy();
  });
});
