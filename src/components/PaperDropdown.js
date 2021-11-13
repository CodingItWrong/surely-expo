import {Menu} from '@codingitwrong/react-native-paper';
import {useState} from 'react';
import {Button} from 'react-native-paper';

export default function PaperDropdown({
  fieldLabel,
  emptyLabel,
  value,
  onValueChange,
  options,
  style,
  keyExtractor,
  labelExtractor,
  testID,
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
          testID={testID}
          mode="outlined"
          accessibilityLabel={fieldLabel}
          style={style}
          onPress={() => setIsMenuShown(true)}
        >
          {fieldLabel}: {value ? labelExtractor(value) : emptyLabel}
        </Button>
      }
    >
      <Menu.Item
        key="paper-dropdown-empty-item"
        title={emptyLabel}
        accessibilityLabel={emptyLabel}
        accessibilityRole="button"
        onPress={() => handleChoose(null)}
      />
      {options.map(option => (
        <Menu.Item
          key={keyExtractor(option)}
          title={labelExtractor(option)}
          accessibilityLabel={labelExtractor(option)}
          accessibilityRole="button"
          onPress={() => handleChoose(option)}
        />
      ))}
    </Menu>
  );
}
