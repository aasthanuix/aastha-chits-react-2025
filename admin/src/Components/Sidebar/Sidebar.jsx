import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiHome,
  FiFileText,
  FiKey,
  FiUpload,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { FaExchangeAlt, FaBullhorn } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Link to="/" className="sidebar-logo" onClick={toggleSidebar}>
        Aastha Chits Admin
      </Link>
      <nav className="sidebar-nav">
        <Link to="/admin/analytics" onClick={toggleSidebar}>
          <FiHome /> Dashboard
        </Link>
        <Link to="/admin/chit-plans" onClick={toggleSidebar}>
          <FiFileText /> Chit Plans
        </Link>
        <Link to="/admin/users" onClick={toggleSidebar}>
          <FiUsers /> Users
        </Link>
        <Link to="/admin/auctions" onClick={toggleSidebar}>
          <FaBullhorn /> Auctions
        </Link>
        <Link to="/admin/transactions" onClick={toggleSidebar}>
          <FaExchangeAlt /> Transactions
        </Link>
        <Link to="/admin/credentials" onClick={toggleSidebar}>
          <FiKey /> Generate Credentials
        </Link>
        <Link to="/admin/upload-brochure" onClick={toggleSidebar}>
          <FiUpload /> Upload Brochure
        </Link>
        <Link to="/admin/profile" onClick={toggleSidebar}>
          <FiUser /> Profile
        </Link>

        <Link to="#" onClick={handleLogout}>
          <FiLogOut /> Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
