import React, {useState} from 'react';
import {Button, Menu} from 'react-native-paper';

export default function PaperDropdown({
  fieldLabel,
  value,
  onValueChange,
  options,
  style,
  keyExtractor,
  labelExtractor,
}) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  function handleChoose(option) {
    onValueChange(option);
    setIsMenuShown(false);
  }

  return (
    <Menu
      visible={isMenuShown}
      onDismiss={() => setIsMenuShown(false)}
      anchor={
        <Button
          mode="outlined"
          style={style}
          onPress={() => setIsMenuShown(true)}
        >
          {fieldLabel}: {value ? labelExtractor(value) : 'none'}
        </Button>
      }
    >
      {options.map(option => (
        <Menu.Item
          key={keyExtractor(option)}
          title={labelExtractor(option)}
          onPress={() => handleChoose(option)}
        />
      ))}
    </Menu>
  );
}
