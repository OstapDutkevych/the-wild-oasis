import { useState } from 'react';
import Button from '../../ui/Button.jsx';
import Form from '../../ui/Form.jsx';
import Input from '../../ui/Input';
import FormRowVertical from '@ui/FormRowVertical.jsx';
import { useLogin } from '@features/authentication/useLogin.js';
import SpinnerMini from '@ui/SpinnerMini.jsx';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLogging } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword('');
          setEmail('');
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogging}>
          {!isLogging ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
