import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="admin-main">
        <Header toggleSidebar={toggleSidebar} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
