import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';

const Profile = ({ url }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fileInputRef = useRef();

  // ---------------- FETCH USER ----------------
  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch(`${url}/api/users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch user');

      const data = await res.json();
      setUser(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching user');
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PROFILE PIC UPLOAD ----------------
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Only JPG or PNG images are allowed');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${url}/api/users/profile-pic`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      await fetchUser();
      setError('');
    } catch (err) {
      setError(err.message || 'Error uploading profile picture');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ---------------- CHANGE PASSWORD ----------------
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg('');

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setPasswordMsg('All fields are required');
    }

    if (newPassword.length < 6) {
      return setPasswordMsg('Password must be at least 6 characters');
    }

    if (newPassword !== confirmPassword) {
      return setPasswordMsg('New passwords do not match');
    }

    try {
      setPasswordLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch(`${url}/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Password update failed');

      setPasswordMsg('✅ Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setPasswordMsg(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    fetchUser();
  }, []);

  // ---------------- UI STATES ----------------
  if (loading)
    return (
      <div className="user-profile-loading">
        <div className="loader"></div>
        <div className="user-profile-page">Loading profile…</div>
      </div>
    );

  if (!user)
    return (
      <div className="user-profile-page">
        😓 <br /> User not found.
      </div>
    );

  // ---------------- JSX ----------------
  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {error && <p className="error-message">{error}</p>}

      {/* PROFILE PIC */}
      <div className="profile-pic-section">
        <img
          src={user.profilePic || '/default-user.png'}
          alt={`${user.name} profile`}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          ref={fileInputRef}
        />
        {uploading && <p>Uploading...</p>}
      </div>

      {/* PROFILE INFO */}
      <div className="profile-info">
        <div className="profile-info-card">
          <i className="fa fa-user"></i>
          <div>
            <strong>Name</strong>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="profile-info-card">
          <i className="fa fa-envelope"></i>
          <div>
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="profile-info-card">
          <i className="fa fa-phone"></i>
          <div>
            <strong>Phone</strong>
            <span>{user.phone}</span>
          </div>
        </div>
      </div>

      {/* ENROLLED CHITS */}
      <div className="enrolled-chits-section">
        <h3>Enrolled Chit Plans</h3>
        {user.enrolledChits && user.enrolledChits.length > 0 ? (
          <div className="chits-grid">
            {user.enrolledChits.map((chit) => (
              <div key={chit._id} className="chit-card">
                <h4>{chit.planName}</h4>
                <p>Monthly: ₹{chit.monthlySubscription}</p>
                <p>Total: ₹{chit.totalAmount}</p>
                <p>Duration: {chit.duration} months</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No enrolled chit plans.</p>
        )}
      </div>

      {/* CHANGE PASSWORD */}
      <div className="change-password-section">
        <h3>Change Password</h3>

        {passwordMsg && (
          <p
            className={
              passwordMsg.includes('success')
                ? 'success-message'
                : 'error-message'
            }
          >
            {passwordMsg}
          </p>
        )}

        <form onSubmit={handleChangePassword} className="change-password-form">
          <div className="input-wrapper">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button type="submit" disabled={passwordLoading}>
            {passwordLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
