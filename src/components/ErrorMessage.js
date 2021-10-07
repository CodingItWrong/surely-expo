import React from 'react';
import {Text, withTheme} from 'react-native-paper';

function ErrorMessage({theme, children, style}) {
  const errorMessageStyle = {
    color: theme.colors.error,
    textAlign: 'center',
    margin: 10,
  };

  return (
    children && (
      <Text testID="error-message" style={[errorMessageStyle, style]}>
        {children}
      </Text>
    )
  );
}

export default withTheme(ErrorMessage);
