import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import theme from '../theme';

export default function ErrorMessage({children, style}) {
  return (
    children && (
      <Text testID="error-message" style={[styles.errorMessage, style]}>
        {children}
      </Text>
    )
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: theme.colors.error,
    textAlign: 'center',
    margin: 10,
  },
});
