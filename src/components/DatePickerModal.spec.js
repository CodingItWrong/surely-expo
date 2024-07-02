import {fireEvent, render, screen} from '@testing-library/react-native';
import {parse} from 'date-fns';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DatePickerModal from './DatePickerModal';

describe('DatePickerModal', () => {
  function wrapper(children) {
    return (
      <SafeAreaProvider
        initialMetrics={{
          frame: {x: 0, y: 0, width: 1000, height: 1000},
          insets: {top: 0, left: 0, right: 0, bottom: 0},
        }}
      >
        {children}
      </SafeAreaProvider>
    );
  }

  describe('when confirming with no date', () => {
    it('calls onConfirm with null', () => {
      const onConfirm = jest.fn().mockName('onConfirm');

      render(
        wrapper(<DatePickerModal saveLabel="Choose" onConfirm={onConfirm} />),
      );

      fireEvent.press(screen.getByText('Choose'));

      expect(onConfirm).toHaveBeenCalledWith(null);
    });
  });

  describe('when confirming with a date selected', () => {
    it('calls onConfirm with the start of that day', () => {
      const onConfirm = jest.fn().mockName('onConfirm');

      render(
        wrapper(<DatePickerModal saveLabel="Choose" onConfirm={onConfirm} />),
      );

      fireEvent.press(screen.getByLabelText('Type in date'));

      // TODO: find out why "start of day" logic is used. Can we input hours?
      // If can't find a reason, remove that branch
      fireEvent.changeText(screen.getByTestId('text-input-flat'), '02/03/2022');
      fireEvent.press(screen.getByText('Choose'));

      // TODO: this time zone thing might fail on CI
      expect(onConfirm).toHaveBeenCalledWith(
        parse('02/03/2022 00:00:00', 'MM/dd/yyyy HH:mm:ss', new Date()),
      );
    });
  });
});
