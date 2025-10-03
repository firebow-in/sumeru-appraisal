import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ 
  title, 
  children, 
  className = '', 
  onClick,
  size = 'medium', // small, medium, large, full
  variant = 'default' // default, primary, secondary, accent
}) => {
  const cardClasses = [
    'dashboard-card',
    `card-size-${size}`,
    `card-variant-${variant}`,
    className,
    onClick ? 'clickable' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
