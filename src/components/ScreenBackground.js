import {View} from 'react-native';
import {withTheme} from 'react-native-paper';

function ScreenBackground({theme, style, children}) {
  const baseStyle = {flex: 1, backgroundColor: theme.colors.background};
  return <View style={[baseStyle, style]}>{children}</View>;
}

export default withTheme(ScreenBackground);
