import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

export default function LoadingIndicator({style}) {
  return (
    <ActivityIndicator
      size="large"
      accessibilityLabel="Loading"
      style={style}
    />
  );
}
