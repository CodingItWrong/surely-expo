import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {Keyboard} from 'react-native';
import NewTodoForm from './NewTodoForm';

jest.mock('react-native', () => ({
  Keyboard: {},
}));

describe('NewTodoForm', () => {
  describe('when no text is inputted', () => {
    it('dismisses the keyboard', () => {
      Keyboard.dismiss = jest.fn().mockName('Keyboard.dismiss');

      render(<NewTodoForm />);

      fireEvent(screen.getByLabelText('New todo name'), 'submitEditing');

      expect(Keyboard.dismiss).toHaveBeenCalledWith();
    });
  });

  describe('when text is inputted', () => {
    const newTodoName = 'New todo name';

    it('passes the name to the onCreate prop, clears the name, and dismisses the keyboard', async () => {
      Keyboard.dismiss = jest.fn().mockName('Keyboard.dismiss');
      const onCreate = jest.fn().mockName('onCreate').mockResolvedValue();

      render(<NewTodoForm onCreate={onCreate} />);

      const newTodoNameField = screen.getByLabelText('New todo name');
      fireEvent.changeText(newTodoNameField, newTodoName);
      fireEvent(newTodoNameField, 'submitEditing');

      await waitFor(() => expect(newTodoNameField).toHaveProp('value', ''));

      expect(onCreate).toHaveBeenCalledWith(newTodoName);
      expect(Keyboard.dismiss).toHaveBeenCalledWith();
    });

    // TODO: test loading state: loading indicator, text not cleared, keyboard not dismissed
    // TODO: when onCreate fails: error message? text not cleared, keyboard not dismissed?
  });
});
