import React, {useState} from 'react';
import {Picker, Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

export default function Chooser({
  label,
  value,
  valueLabel,
  onValueChange,
  children,
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isPickerShown, setIsPickerShown] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.chooserRow}>
        <Text>{label}</Text>
        <Picker selectedValue={value} onValueChange={onValueChange}>
          {children}
        </Picker>
      </View>
    );
  } else if (isPickerShown) {
    function handleChoose() {
      onValueChange(localValue);
      setIsPickerShown(false);
    }

    function handleCancel() {
      setLocalValue(value);
      setIsPickerShown(false);
    }

    return (
      <>
        <Picker selectedValue={localValue} onValueChange={setLocalValue}>
          {children}
        </Picker>
        <Button mode="outlined" onPress={handleCancel}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleChoose}>
          Choose
        </Button>
      </>
    );
  } else {
    return (
      <Button mode="outlined" onPress={() => setIsPickerShown(true)}>
        {label}: {valueLabel}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  chooserRow: {
    flexDirection: 'row',
  },
});
