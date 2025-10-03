import React, { useState } from 'react';
import './NotificationBell.css';

const NotificationBell = ({ 
  count = 0, 
  onClick,
  size = 'medium', // small, medium, large
  variant = 'default' // default, primary, accent
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const bellClasses = [
    'notification-bell',
    `bell-size-${size}`,
    `bell-variant-${variant}`,
    count > 0 ? 'has-notifications' : '',
    onClick ? 'clickable' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={bellClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circular Background (Ellipse) */}
      <div className="notification-background">
        {/* Notification Icon Frame */}
        <div className="notification-icon-frame">
          {/* Bell Icon SVG */}
          <svg 
            className="notification-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7C13 10.76 15.45 14 16 14H8C8.55 14 11 10.76 11 7V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM21 16V17H3V16L5 14V10.5C5 7.43 7.86 5 12 5S19 7.43 19 10.5V14L21 16ZM14 18C14 19.1 13.1 20 12 20S10 18.9 10 18" 
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Notification Count Badge */}
        {count > 0 && (
          <div className="notification-badge">
            <span className="badge-count">
              {count > 99 ? '99+' : count}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default NotificationBell;
