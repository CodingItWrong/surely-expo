import {withTheme} from '@codingitwrong/react-native-paper';
import {View} from 'react-native';

function ScreenBackground({theme, style, children}) {
  const baseStyle = {flex: 1, backgroundColor: theme.colors.background};
  return <View style={[baseStyle, style]}>{children}</View>;
}

export default withTheme(ScreenBackground);
