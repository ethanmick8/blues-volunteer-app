// INITIAL HELLO WORLD IMPLEMENTATION - CREATE REACT APP
/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World! - Blues Team
        </p>
      </header>
    </div>
  );
}
export default App; */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from './api/config';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
//import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(Cookies.get('loggedIn') === 'true');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  /*const checkLoginStatus = async () => {
    try {
      const response = await api.get('/users/isLoggedIn');
      if (response.data.loggedIn) {
        setLoggedIn(true);
        Cookies.set('loggedIn', 'true');
      } else {
        setLoggedIn(false);
        Cookies.remove('loggedIn');
      }
    } catch (error) {
      setLoggedIn(false);
      Cookies.remove('loggedIn');
    }
  };  */
  const checkLoginStatus = async () => {
    return new Promise(async (resolve) => {
      try {
        const response = await api.get('/users/isLoggedIn');
        if (response.data.loggedIn) {
          setLoggedIn(true);
          Cookies.set('loggedIn', 'true');
        } else {
          setLoggedIn(false);
          Cookies.remove('loggedIn');
        }
        resolve();
      } catch (error) {
        setLoggedIn(false);
        Cookies.remove('loggedIn');
        resolve();
      }
    });
  };
  
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={checkLoginStatus} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={loggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
  }

export default App;
