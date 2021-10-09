import {View} from 'react-native';
import {screenWidthMin, useStyleQueries} from 'react-native-style-queries';
import {breakpointMedium} from '../breakpoints';

export default function ButtonGroup({children}) {
  const styles = useStyleQueries(styleQueries);
  return <View style={styles.buttonContainer}>{children}</View>;
}

const styleQueries = {
  buttonContainer: [
    {
      flexDirection: 'column',
    },
    screenWidthMin(breakpointMedium, {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }),
  ],
};
