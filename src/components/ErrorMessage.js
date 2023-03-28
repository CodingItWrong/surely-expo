import {View} from 'react-native';
import {Text, withTheme} from 'react-native-paper';

function ErrorMessage({theme, children, style}) {
  const errorMessageStyle = {
    color: theme.colors.error,
    textAlign: 'center',
    margin: 10,
  };

  return (
    children && (
      <View accessible accessibilityRole="alert">
        <Text testID="error-message" style={[errorMessageStyle, style]}>
          {children}
        </Text>
      </View>
    )
  );
}

export default withTheme(ErrorMessage);
