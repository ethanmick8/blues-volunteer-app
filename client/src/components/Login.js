import React, { useState } from 'react';
import api from '../api/config';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data.message === 'Login successful') {
        await onLogin();
        navigate('/home');
        console.log('Status:', response.data.message);
      } else {
        console.log('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = '/auth/github';
  };

  function goToRegister() {
    window.location.href = '/register';
  }  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
      <p>---We haven't figured out OAuth2 completely yet, but local login/registration works as required.</p>
      <br />
      <button onClick={goToRegister}>Register an Account</button>
    </div>
  );
};

export default Login;