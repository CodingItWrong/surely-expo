import {fireEvent, render, screen} from '@testing-library/react-native';
import {large, medium, useBreakpoint} from '../breakpoints';
import NavigationBar from './NavigationBar';

jest.mock('../breakpoints');

describe('NavigationBar', () => {
  describe('back button', () => {
    describe('when React Nav provides a truthy back prop', () => {
      it('renders a button that allows you to go back', () => {
        const options = {};
        const navigation = {
          goBack: jest.fn().mockName('navigation.goBack'),
        };

        render(
          <NavigationBar back options={options} navigation={navigation} />,
        );

        fireEvent.press(screen.getByLabelText('Back'));

        expect(navigation.goBack).toHaveBeenCalledWith();
      });
    });

    describe('when React Nav provides a falsy back prop', () => {
      it('does not render a back button', () => {
        const options = {};
        const navigation = {};

        render(
          <NavigationBar
            back={false}
            options={options}
            navigation={navigation}
          />,
        );

        expect(screen.queryByLabelText('Back')).toBeNull();
      });
    });
  });

  describe('menu button', () => {
    describe('when on a viewport that is not large', () => {
      it('render a button that allows toggling the drawer', () => {
        useBreakpoint.mockReturnValue(large);

        const options = {};
        const navigation = {};

        render(<NavigationBar options={options} navigation={navigation} />);

        expect(screen.queryByLabelText('Menu')).toBeNull();
      });
    });

    describe('when on a large viewport', () => {
      it('does not render a menu button', () => {
        useBreakpoint.mockReturnValue(medium);

        const options = {};
        const navigation = {
          toggleDrawer: jest.fn().mockName('navigation.toggleDrawer'),
        };

        render(<NavigationBar options={options} navigation={navigation} />);

        fireEvent.press(screen.getByLabelText('Menu'));

        expect(navigation.toggleDrawer).toHaveBeenCalledWith();
      });
    });
  });
});
