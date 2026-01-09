import React from 'react';
import { FiMenu } from 'react-icons/fi';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h3 className="topbar-title">Admin Dashboard</h3>
      </div>

      <div className="topbar-right">
        <FiMenu className="hamburger-icon" onClick={toggleSidebar} />
      </div>
    </header>
  );
};

export default Header;
