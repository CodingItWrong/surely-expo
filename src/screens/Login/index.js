import {useState} from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Login({onLogIn}) {
  const [showSignupForm, setShowSignUpForm] = useState(false);
  const [showSignedUpMessage, setShowSignedUpMessage] = useState(false);

  function handleSignUpSuccess() {
    setShowSignUpForm(false);
    setShowSignedUpMessage(true);
  }

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
