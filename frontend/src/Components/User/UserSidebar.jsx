import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './UserSidebar.css';

const UserSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  return (
    <>
      <div className={`user-sidebar ${open ? 'open' : ''}`}>
        {/* Mobile close button */}
        <button className="sidebar-close" onClick={closeSidebar}>
          <FaTimes />
        </button>

        <h2 className="sidebar-logo">Aastha Chits</h2>

        <nav className="sidebar-nav">
          <NavLink to="/user/dashboard" className="sidebar-link" onClick={closeSidebar}>
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>

          <NavLink to="/user/transactions" className="sidebar-link" onClick={closeSidebar}>
            <FaExchangeAlt className="icon" /> Transactions
          </NavLink>

          <NavLink to="/user/chit-plan" className="sidebar-link" onClick={closeSidebar}>
            <FaClipboardList className="icon" /> Chit Plan
          </NavLink>

          <NavLink to="/user/profile" className="sidebar-link" onClick={closeSidebar}>
            <FaUser className="icon" /> Profile
          </NavLink>

          <NavLink to="/login" className="sidebar-link" onClick={closeSidebar}>
            <FaSignOutAlt className="icon" /> Logout
          </NavLink>
        </nav>
      </div>

      {/* Mobile hamburger button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
};

export default UserSidebar;
