import React, {useState} from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Login({onLogIn}) {
  const [showSignupForm, setShowSignUpForm] = useState(false);

  if (showSignupForm) {
    return (
      <SignUpForm
        onSignUpSuccess={() => setShowSignUpForm(false)}
        onCancel={() => setShowSignUpForm(false)}
      />
    );
  } else {
    return (
      <LoginForm onLogIn={onLogIn} onSignUp={() => setShowSignUpForm(true)} />
    );
  }
}
