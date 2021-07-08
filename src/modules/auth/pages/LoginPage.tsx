import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { LoginForm } from '../components';
import { LoginFormErrors } from '../components/LoginForm';
import { useAuth } from '../hooks';

import './LoginPage.css';

function getDefaultFormErrors() {
  return { email: [], password: [] };
}

const LoginPage : React.FC<{}> = () => {
  const auth = useAuth();
  const [formErrors, setFormErrors] = useState<LoginFormErrors>(getDefaultFormErrors());
  const [errMessage, setErrMessage] = useState<string>('');
  const handleSubmit = useCallback((payload: { password: string, email: string }) => {
    setFormErrors(getDefaultFormErrors());

    auth.login(payload.email, payload.password)
      .catch((err: AxiosError) => {
        if (!err.response) throw err;
        if (err.response.status === 422) {
          setFormErrors(err.response.data.errors);
          return;
        }
        
        setErrMessage(err.response.data.message);
      });
  }, [auth]);

  return (
    <div>
      <div className="login-form-wrapper">
        <h1>Login</h1>
        {errMessage ? <div>{errMessage}</div> : null}
        <LoginForm errors={formErrors} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;