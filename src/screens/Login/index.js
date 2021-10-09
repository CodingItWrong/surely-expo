import {useState} from 'react';
import {Appbar} from 'react-native-paper';
import CenterColumn from '../../components/CenterColumn';
import ScreenBackground from '../../components/ScreenBackground';
import sharedStyles from '../../sharedStyles';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Login({onLogIn}) {
  const [showSignupForm, setShowSignUpForm] = useState(false);
  const [showSignedUpMessage, setShowSignedUpMessage] = useState(false);

  function handleSignUpSuccess() {
    setShowSignUpForm(false);
    setShowSignedUpMessage(true);
  }

  function contents() {
    if (showSignupForm) {
      return (
        <SignUpForm
          onSignUpSuccess={handleSignUpSuccess}
          onCancel={() => setShowSignUpForm(false)}
        />
      );
    } else {
      return (
        <LoginForm
          onLogIn={onLogIn}
          onSignUp={() => setShowSignUpForm(true)}
          showSignedUpMessage={showSignedUpMessage}
        />
      );
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Surely" />
      </Appbar.Header>
      <ScreenBackground style={sharedStyles.bodyPadding}>
        <CenterColumn>{contents()}</CenterColumn>
      </ScreenBackground>
    </>
  );
}
