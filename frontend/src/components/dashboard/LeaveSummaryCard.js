import React from 'react';
import DashboardCard from './DashboardCard';

const LeaveSummaryCard = ({ onRequestLeave, onTimeOff }) => {
  return (
    <DashboardCard 
      title="Leave Summary"
      size="large"
    >
      <div className="leave-grid">
        <div className="leave-item">
          <div className="leave-count">00</div>
          <div className="leave-type">Annual Leave</div>
        </div>
        <div className="leave-item">
          <div className="leave-count">03</div>
          <div className="leave-type">Sick Leave</div>
        </div>
        <div className="leave-item">
          <div className="leave-count">05</div>
          <div className="leave-type">Casual Leave</div>
        </div>
        <div className="leave-item">
          <div className="leave-count">01</div>
          <div className="leave-type">Compof</div>
        </div>
      </div>
      <div className="leave-actions">
        <button className="action-btn primary" onClick={onRequestLeave}>
          Request Leave
        </button>
        <button className="action-btn secondary" onClick={onTimeOff}>
          Time OFF
        </button>
      </div>
    </DashboardCard>
  );
};

export default LeaveSummaryCard;
