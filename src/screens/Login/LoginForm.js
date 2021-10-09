import {StyleSheet} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {useStyleQueries} from 'react-native-style-queries';
import useLoginForm from '../../auth/useLoginForm';
import ButtonGroup from '../../components/ButtonGroup';
import ErrorMessage from '../../components/ErrorMessage';
import sharedStyleQueries from '../../sharedStyleQueries';

export default function LoginForm({showSignedUpMessage, onLogIn, onSignUp}) {
  const responsiveStyles = useStyleQueries(sharedStyleQueries);
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  return (
    <>
      <Title style={styles.tagline}>
        A focused todo app giving you only what you need to get your todos done.
      </Title>
      {showSignedUpMessage && (
        <Text>
          Sign up successful. Log in with the email and password you used to
          sign up.
        </Text>
      )}
      <TextInput
        testID="email-field"
        label="Email"
        value={username}
        onChangeText={handleChange('username')}
        onSubmitEditing={handleLogIn}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        testID="password-field"
        label="Password"
        value={password}
        onChangeText={handleChange('password')}
        onSubmitEditing={handleLogIn}
        secureTextEntry
      />
      <ErrorMessage>{error}</ErrorMessage>
      <ButtonGroup>
        <Button
          mode="outlined"
          testID="sign-up-button"
          onPress={onSignUp}
          style={responsiveStyles.button}
        >
          Sign up
        </Button>
        <Button
          mode="contained"
          testID="sign-in-button"
          onPress={handleLogIn}
          style={responsiveStyles.button}
        >
          Sign in
        </Button>
      </ButtonGroup>
    </>
  );
}

const styles = StyleSheet.create({
  tagline: {
    textAlign: 'center',
    marginTop: 20,
  },
});
