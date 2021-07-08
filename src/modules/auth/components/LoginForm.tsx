import React, { useCallback } from 'react';
import './LoginForm.css';

export interface LoginFormErrors {
  email: string[];
  password: string[];
}

export interface LoginFormPayload {
  email: string,
  password: string,
}

interface Props {
  errors: LoginFormErrors;
  onSubmit: (payload: LoginFormPayload) => void;
}

interface LoginFormElement extends HTMLFormElement {
  email: HTMLInputElement,
  password: HTMLInputElement,
}

const LoginForm : React.FC<Props> = ({ errors, onSubmit }) => {
  const handleSubmit = useCallback((event: React.SyntheticEvent<LoginFormElement>) => {
    event.preventDefault();
    event.persist();
    const form = event.target as LoginFormElement;
    const email = form.email.value;
    const password = form.password.value;

    onSubmit({ email, password });
  }, [onSubmit]);
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {errors?.email?.[0]}
      </div>
      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {errors?.password?.[0]}
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default LoginForm;