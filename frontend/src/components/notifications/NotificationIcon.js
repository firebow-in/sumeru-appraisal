import React from 'react';
import { FiBell } from 'react-icons/fi';
import './NotificationIcon.css';

const NotificationIcon = ({ count = 0, onClick }) => {
  return (
    <div className="notification-icon" onClick={onClick}>
      <FiBell className="bell-icon" />
      {count > 0 && (
        <span className="notification-badge">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
