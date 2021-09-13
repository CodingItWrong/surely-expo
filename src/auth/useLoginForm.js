import {useState} from 'react';

export default function useLoginForm(onLogIn) {
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

  return {username, password, error, handleChange, handleLogIn};
}
