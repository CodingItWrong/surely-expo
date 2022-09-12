import {fireEvent, render, screen} from '@testing-library/react-native';
import {Linking} from 'react-native';
import {APP_STORE_URL} from '../../constants';
import DownloadOnTheAppStoreButton from './index';

describe('DownloadOnTheAppStoreButton', () => {
  describe('when clicking the button', () => {
    it('opens the App Store web site in a browser', () => {
      render(<DownloadOnTheAppStoreButton />);

      fireEvent.press(screen.getByLabelText('Download on the App Store'));

      expect(Linking.openURL).toHaveBeenCalledWith(APP_STORE_URL);
    });
  });
});
