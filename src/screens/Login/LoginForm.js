import axios from 'axios';
import {StyleSheet} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {useStyleQueries} from 'react-native-style-queries';
import oauthLogin from '../../auth/oauthLogin';
import useLoginForm from '../../auth/useLoginForm';
import baseUrl from '../../baseUrl';
import ButtonGroup from '../../components/ButtonGroup';
import ErrorMessage from '../../components/ErrorMessage';
import ScreenBackground from '../../components/ScreenBackground';
import {useToken} from '../../data/token';
import sharedStyleQueries from '../../sharedStyleQueries';
import sharedStyles from '../../sharedStyles';

const httpClient = axios.create({baseURL: baseUrl});

export default function LoginForm({navigation}) {
  const {setToken} = useToken();
  const responsiveStyles = useStyleQueries(sharedStyleQueries);
  const onLogIn = ({username, password}) =>
    oauthLogin({
      httpClient,
      username,
      password,
    }).then(setToken);
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  return (
    <ScreenBackground style={sharedStyles.bodyPadding}>
      <Title style={styles.tagline}>
        A focused todo app giving you only what you need to get your todos done.
      </Title>
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
          onPress={() => navigation.navigate('Sign up')}
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
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  tagline: {
    textAlign: 'center',
    marginTop: 20,
  },
});
