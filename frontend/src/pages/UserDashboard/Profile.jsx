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
