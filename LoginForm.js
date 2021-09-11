import React, {useState} from 'react';

export default function LoginForm({onLogIn, formComponent: FormComponent}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChange = field => param => {
    let text;

    if (param.target) {
      text = param.target.value;
    } else {
      text = param;
    }

    const setters = {
      username: setUsername,
      password: setPassword,
    };

    setters[field](text);
    setError(null);
  };

  const handleLogIn = () => onLogIn({username, password}).catch(setError);

  return (
    <FormComponent
      username={username}
      password={password}
      error={error}
      onChange={handleChange}
      onLogIn={handleLogIn}
    />
  );
}
