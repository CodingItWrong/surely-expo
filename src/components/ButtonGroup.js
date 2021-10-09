import {View} from 'react-native';
import {screenWidthMin, useStyleQueries} from 'react-native-style-queries';

export default function ButtonGroup({children}) {
  const styles = useStyleQueries(styleQueries);
  return <View style={styles.buttonContainer}>{children}</View>;
}

const styleQueries = {
  buttonContainer: [
    {
      flexDirection: 'column',
    },
    screenWidthMin(429, {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }),
  ],
};
