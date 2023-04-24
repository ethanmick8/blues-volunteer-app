import React from 'react';
import api from '../api/config';

const Home = () => {
  function goToProfile() {
    window.location.href = '/profile';
  }

  async function handleLogout() {
    try {
      await api.get('/users/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Welcome to VMS Blues!</h2>
        <br />
        <button onClick={goToProfile}>View my Profile</button>
        <br />
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Home;
