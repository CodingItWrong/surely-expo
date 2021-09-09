import {render} from '@testing-library/react-native';
import React from 'react';
import App from './App';

describe('App', () => {
  it('renders a hello message', () => {
    const {queryByText} = render(<App />);
    expect(queryByText('Hello, React Native!')).not.toBeNull();
  });
});
