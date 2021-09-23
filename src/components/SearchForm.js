import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function SearchForm({value, onSubmit}) {
  const [searchText, setSearchText] = useState(value);

  const handleSubmit = () => onSubmit(searchText);

  return (
    <TextInput
      label="search"
      value={searchText}
      onChangeText={setSearchText}
      onSubmitEditing={handleSubmit}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
