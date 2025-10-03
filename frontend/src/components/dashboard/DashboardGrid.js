import React from 'react';
import './DashboardCard.css';

const DashboardGrid = ({ 
  children, 
  columns = 'auto-fit', // 2, 3, 4, auto-fit
  gap = '16px',
  className = ''
}) => {
  const gridClasses = [
    'dashboard-grid',
    `grid-${columns}-columns`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={gridClasses}
      style={{ gap }}
    >
      {children}
    </div>
  );
};

export default DashboardGrid;
