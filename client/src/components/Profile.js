import React, { useState, useEffect } from 'react';
import api from '../api/config';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data.user);
      setFormData(response.data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirm new password fields do not match.");
      return;
    }
    try {
      await api.put('/users/change-password', passwordData);
      alert("Password updated successfully.");
    } catch (error) {
      console.error('Error changing password:', error);
      alert("Error changing password. Please try again.");
    }
  };  

  const handleSaveChanges = async () => {
    try {
      await api.put('/users/profile', formData);
      setUser(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const goToHome = () => {
    window.location.href = '/home';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editing ? (
        <>
            <h1>Edit Profile</h1>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <br />
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input type="text" name="phoneNum" value={formData.phoneNum} onChange={handleChange} />
            </label>
            <br />
            <label>
                Address Line 1:
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
            </label>
            <br />
            <label>
                Address Line 2:
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
            </label>
            <br />
            <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </label>
            <br />
            <label>
                State:
                <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </label>
            <br />
            <label>
                Postal Code:
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </label>
            <br />
            <label>
                Country:
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
            </label>
            <br />
            <button onClick={() => setEditing(false)}>Cancel</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
        </>
      ) : (
        <>
          <h1>Profile</h1>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Phone Number: {user.phoneNum}</p>
          <p>Address Line 1: {user.addressLine1}</p>
          <p>Address Line 2: {user.addressLine2}</p>
          <p>City: {user.city}</p>
          <p>State: {user.state}</p>
          <p>Postal Code: {user.postalCode}</p>
          <p>Country: {user.country}</p>
          <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? "Hide Change Password" : "Change Password"}
          </button>
          {showPasswordForm && (
          <div>
            <h2>Change Password</h2>
            <label>
              Current Password:
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <label>
              Confirm New Password:
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <button onClick={handleChangePassword}>Update Password</button>
          </div>
        )}

          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
      <br />
      <button onClick={goToHome}>Back to Home</button>
    </div>
  );
};

export default Profile;