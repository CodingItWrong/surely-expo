import {screenWidthMin} from 'react-native-style-queries';
import {breakpointMedium} from './breakpoints';

const sharedStyleQueries = {
  button: [
    {
      marginTop: 10,
    },
    screenWidthMin(breakpointMedium, {
      marginLeft: 10,
    }),
  ],
};

export default sharedStyleQueries;
