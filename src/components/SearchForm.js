import {TextInput} from '@codingitwrong/react-native-paper';
import {useState} from 'react';

export default function SearchForm({value, onSubmit}) {
  const [searchText, setSearchText] = useState(value);

  const handleSubmit = () => onSubmit(searchText);

  return (
    <TextInput
      testID="search-field"
      label="search"
      value={searchText}
      onChangeText={setSearchText}
      onSubmitEditing={handleSubmit}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
