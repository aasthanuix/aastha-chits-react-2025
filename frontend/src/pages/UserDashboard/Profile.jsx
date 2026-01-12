/* ------------------- GLOBAL STYLES ------------------- */
.profile-container {
  max-width: 950px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: #111827;
  transition: all 0.3s ease;
}

/* HEADINGS */
h2 {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  /* color: #1e3a8a; */
}

/* ------------------- ERROR / SUCCESS ------------------- */
.error-message,
.success-message {
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.error-message {
  background: #fee2e2;
  color: #b91c1c;
}

.success-message {
  background: #dcfce7;
  color: #166534;
}

/* ------------------- PROFILE PICTURE ------------------- */
.profile-pic-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
}

.profile-pic-section img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3b82f6;
  transition: all 0.3s ease;
}

.profile-pic-section img:hover {
  transform: scale(1.05) rotate(1deg);
}

.profile-pic-section input[type="file"] {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.profile-pic-section input[type="file"]:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* ------------------- PROFILE INFO MODERN ------------------- */
.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  background: #fff;
  padding: 1.5rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.profile-info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f9fafb;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.profile-info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.profile-info-card strong {
  display: block;
  color: #1e3a8a;
  font-weight: 600;
  font-size: 0.95rem;
}

.profile-info-card span {
  color: #374151;
  font-size: 0.95rem;
}

/* Optional: add small icons */
.profile-info-card i {
  font-size: 1.2rem;
  color: #3b82f6;
  min-width: 24px;
  text-align: center;
}

/* ------------------- CHITS SECTION ------------------- */
.enrolled-chits-section {
     margin-bottom: 15px;
    margin-top: 15px;
}

.enrolled-chits-section h3 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #1e3a8a;
  text-align: center;
}

.chits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
}

.chit-card {
  background: linear-gradient(145deg, #ffffff, #f1f5f9);
  padding: 1.25rem 1rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
}

.chit-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
}

.chit-card h4 {
  margin-bottom: 0.75rem;
  font-size: 1.15rem;
  color: #1e3a8a;
  font-weight: 600;
}
/* ------------------- CHANGE PASSWORD MODERN ------------------- */
.change-password-section {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
  max-width: 500px;
  margin: 2rem auto;
  transition: all 0.3s ease;
}

.change-password-section h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e3a8a;
  text-align: center;
}

/* Password form layout */
.change-password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.change-password-form input {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  background: #f9fafb;
}

.change-password-form input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  outline: none;
}

/* Button styling */
.change-password-form button {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-password-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

/* Success & error messages */
.change-password-section .error-message,
.change-password-section .success-message {
  text-align: center;
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.change-password-section .error-message {
  background: #fee2e2;
  color: #b91c1c;
}

.change-password-section .success-message {
  background: #dcfce7;
  color: #166534;
}

/* Responsive */
@media (max-width: 640px) {
  .change-password-section {
    padding: 1.5rem 1rem;
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 12px;
  color: #3b82f6;
}

.input-wrapper input {
  padding-left: 2.5rem; /* space for icon */
}


/* ------------------- LOADING ------------------- */
.user-profile-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ------------------- RESPONSIVE ------------------- */
@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
  }

  .profile-info p {
    justify-content: flex-start;
  }

  .chits-grid {
    grid-template-columns: 1fr;
  }

  .profile-container {
    padding: 1.5rem;
  }
}
use same style with unique classnames
import React, { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Profile.css";

const Profile = ({ url }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fileInputRef = useRef();

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= PROFILE PIC UPLOAD =================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/api/users/profile-pic`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      fetchUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      fileInputRef.current.value = "";
    }
  };

  // ================= PASSWORD =================
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword)
      return setPasswordMsg("All fields are required");

    if (newPassword !== confirmPassword)
      return setPasswordMsg("Passwords do not match");

    try {
      setPasswordLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${url}/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPasswordMsg("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordMsg(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div className="up-loading">Loading profile…</div>;
  if (!user) return <div className="up-loading">User not found</div>;

  return (
    <div className="up-container">
      <h2 className="up-title">User Profile</h2>

      {error && <p className="up-error">{error}</p>}

      {/* PROFILE PIC */}
      <div className="up-avatar-section">
        <img
          src={user.profilePic || "/default-user.png"}
          alt="Profile"
          className="up-avatar"
        />
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        {uploading && <span>Uploading...</span>}
      </div>

      {/* USER INFO */}
      <div className="up-info-grid">
        <div className="up-info-card">
          <FaUser />
          <div>
            <strong>Name</strong>
            <span>{user.name}</span>
          </div>
        </div>
        <div className="up-info-card">
          <FaEnvelope />
          <div>
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="up-info-card">
          <FaPhone />
          <div>
            <strong>Phone</strong>
            <span>{user.phone}</span>
          </div>
        </div>
      </div>

      {/* CHITS */}
      <div className="up-chits">
        <h3>Enrolled Chit Plans</h3>
        <div className="up-chits-grid">
          {user.enrolledChits?.length ? (
            user.enrolledChits.map((chit) => (
              <div key={chit._id} className="up-chit-card">
                <h4>{chit.planName}</h4>
                <p>Monthly: ₹{chit.monthlySubscription}</p>
                <p>Total: ₹{chit.totalAmount}</p>
                <p>Duration: {chit.duration} months</p>
              </div>
            ))
          ) : (
            <p>No enrolled chits</p>
          )}
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="up-password">
        <h3>Change Password</h3>

        {passwordMsg && (
          <p
            className={
              passwordMsg.includes("success")
                ? "up-success"
                : "up-error"
            }
          >
            {passwordMsg}
          </p>
        )}

        <form onSubmit={handleChangePassword}>
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field) => (
              <div key={field} className="up-input-wrap">
                <FaLock />
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={passwordData[field]}
                  onChange={handlePasswordChange}
                />
                <span onClick={() => togglePassword(field)}>
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )
          )}

          <button disabled={passwordLoading}>
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
