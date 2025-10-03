import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content - offset by sidebar width on desktop, full width on mobile */}
      <div className="main-content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
