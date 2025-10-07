import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Leave.css';

const Leave = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const leaveMenuItems = [
    {
      path: '/leave/request',
      label: 'Request Leave',
      icon: '📝',
      description: 'Submit new leave requests'
    },
    {
      path: '/leave-history',
      label: 'Leave History',
      icon: '📊',
      description: 'View past leave records'
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="leave-page">
      <div className="leave-header">
        <h1>Leave Management</h1>
        <p>Manage your leave requests</p>
      </div>

      <div className="leave-content">
        <div className="leave-menu">
          {leaveMenuItems.map((item, index) => (
            <div
              key={index}
              className={`leave-menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.path)}
            >
              <div className="menu-item-icon">{item.icon}</div>
              <div className="menu-item-content">
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="leave-details">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Leave;
