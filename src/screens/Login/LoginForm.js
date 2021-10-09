import {Button, Text, TextInput} from 'react-native-paper';
import {useStyleQueries} from 'react-native-style-queries';
import useLoginForm from '../../auth/useLoginForm';
import ButtonGroup from '../../components/ButtonGroup';
import ErrorMessage from '../../components/ErrorMessage';
import sharedStyleQueries from '../../sharedStyleQueries';

export default function LoginForm({showSignedUpMessage, onLogIn, onSignUp}) {
  const styles = useStyleQueries(sharedStyleQueries);
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  return (
    <>
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
          style={styles.button}
        >
          Sign up
        </Button>
        <Button
          mode="contained"
          testID="sign-in-button"
          onPress={handleLogIn}
          style={styles.button}
        >
          Sign in
        </Button>
      </ButtonGroup>
    </>
  );
}
