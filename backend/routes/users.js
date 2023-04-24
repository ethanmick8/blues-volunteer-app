const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

  // register route
  router.post('/register', async (req, res) => {
    console.log('Register request received:', req.body);
    try {
      const { email, password, username, firstName, lastName, phoneNum, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create the user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
        phoneNum,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Login route
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      req.logIn(user, (err) => {
        console.log(req.user);
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        req.session.userId = user.id;
        return res.status(200).json({ message: 'Login successful', user });
      });
    })(req, res, next);
  });

  // Fetch the user's profile
  router.get('/profile', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        console.log('User is logged in:', req.user)
        const user = await User.findByPk(req.user.id);
        res.json({ user });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update the user's profile
  router.put('/profile', async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const { email, password, username, firstName, lastName, phoneNum, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
  
        // Hash the new password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : req.user.password;
  
        await User.update(
          {
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName,
            phoneNum,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
          },
          { where: { id: req.user.id } }
        );
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(401).json({ message: 'User is not logged in' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  // Login verification route
  router.get('/isLoggedIn', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(401).json({ loggedIn: false });
    }
  });

  // Password change route
  router.put('/change-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    try {
      const user = await User.findByPk(req.user.id);
  
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Verify current password
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        console.error('Current password is incorrect');
        return res.status(400).json({ message: "Current password is incorrect." });
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update password in database
      await user.update({ password: hashedPassword });
  
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: "Error changing password. Please try again." });
    }
  });

  // Logout route
  router.get('/logout', (req, res) => {
    req.user = null;
    req.session.regenerate((err) => {
      if (err) {
        console.error('Error regenerating session:', err);
        return res.status(500).json({ message: 'Server error', error: err });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
  
  // dev test route (delete later)
  router.get('/test-session', (req, res) => {
    if (!req.session.views) {
      req.session.views = 1;
    } else {
      req.session.views += 1;
    }
    res.json({ views: req.session.views });
  });
  
module.exports = router;