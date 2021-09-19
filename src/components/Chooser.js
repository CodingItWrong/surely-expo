import React, {useState} from 'react';
import {Picker, Platform, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

export default function Chooser({
  label,
  value,
  valueLabel,
  onValueChange,
  children,
  style,
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isPickerShown, setIsPickerShown] = useState(false);

  function contents() {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.chooserRow}>
          <Text style={styles.label}>{label}</Text>
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
        <View style={styles.container}>
          <Picker
            selectedValue={localValue}
            onValueChange={setLocalValue}
            style={styles.picker}
          >
            {children}
          </Picker>
          <Button mode="outlined" onPress={handleCancel} style={styles.button}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleChoose} style={styles.button}>
            Choose
          </Button>
        </View>
      );
    } else {
      return (
        <Button mode="outlined" onPress={() => setIsPickerShown(true)}>
          {label}: {valueLabel}
        </Button>
      );
    }
  }

  return <View style={style}>{contents()}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  chooserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
  },
  label: {
    marginRight: 10,
  },
});
