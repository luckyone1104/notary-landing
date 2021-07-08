import './auth.css';
import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../common/Loading';

import { Route, Redirect } from 'react-router-dom';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser: user, signIn } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await signIn(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err.code);
      setLoading(false);
      if (err.code === 'auth/user-not-found') {
        setError('Користувача не знайдено!');
      } else if (err.code === 'auth/wrong-password') {
        setError('Пароль введено неправильно!');
      } else {
        setError('Не вдалось увійти! Спробуйте ще раз пізніше.');
      }
    }
  }

  if (user === undefined) {
    // "user === undefined" until client gets response from firebase auth
    return <Loading size="window" />;
  } else if (user) {
    return (
      <Route>
        <Redirect to={{ pathname: '/admin' }} />
      </Route>
    );
  } else {
    //when firebase auth responded with 'no user signed in'
    return (
      <div className="auth">
        <form className="auth__login block-shadow" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              Електронна адреса
            </label>
            <input
              disabled={loading}
              ref={emailRef}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              autoComplete="on"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              disabled={loading}
              ref={passwordRef}
              type="password"
              className="form-control"
              id="password"
              autoComplete="on"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="auth__login__submit btn btn-primary"
            id="log-in"
          >
            {loading ? <Loading /> : 'Увійти'}
          </button>
        </form>
      </div>
    );
  }
}
