import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import useLoginForm from '../../auth/useLoginForm';
import ErrorMessage from '../../components/ErrorMessage';
import ScreenBackground from '../../components/ScreenBackground';
import sharedStyles from '../../sharedStyles';

export default function LoginForm({showSignedUpMessage, onLogIn, onSignUp}) {
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Surely" />
      </Appbar.Header>
      <ScreenBackground style={sharedStyles.bodyPadding}>
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
        <Button
          mode="outlined"
          testID="sign-up-button"
          onPress={onSignUp}
          style={sharedStyles.buttonSpacing}
        >
          Sign up
        </Button>
        <Button
          mode="contained"
          testID="sign-in-button"
          onPress={handleLogIn}
          style={sharedStyles.buttonSpacing}
        >
          Sign in
        </Button>
      </ScreenBackground>
    </>
  );
}
