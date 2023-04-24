import React, { useState } from 'react';
import api from '../api/config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/register', {
        email,
        password,
        username,
        firstName,
        lastName,
        phoneNum,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country
      });
      console.log('Response received:', response);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  const handleGitHubRegister = async () => {
    window.location.href = '/auth/github';
  };

  function goToLogin() {
    window.location.href = '/login';
  }  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          placeholder="Address Line 1"
          required
        />
        <input
          type="text"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          placeholder="Address Line 2"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
        />
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Postal Code"
          required
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <button type="submit">Register</button>
      </form>
      <hr />
      <button onClick={handleGitHubRegister}>Sign up with GitHub</button>
      <br />
      <button onClick={goToLogin}>Login</button>
    </div>
  );
};

export default Register;
