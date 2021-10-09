import {screenWidthMin} from 'react-native-style-queries';

const sharedStyleQueries = {
  button: [
    {
      marginTop: 10,
    },
    screenWidthMin(429, {
      marginLeft: 10,
    }),
  ],
};

export default sharedStyleQueries;
