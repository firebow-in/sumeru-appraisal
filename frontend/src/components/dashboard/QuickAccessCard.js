import React from 'react';
import DashboardCard from './DashboardCard';

const QuickAccessCard = ({ onLeaveHistory, onAttendance }) => {
  return (
    <DashboardCard 
      title="Quick Access"
      size="medium"
    >
      <div className="leave-attend-cards">
        <div className="quick-card" onClick={onLeaveHistory}>
          <div className="card-content"></div>
          <div className="card-title">Leave history</div>
        </div>
        <div className="quick-card" onClick={onAttendance}>
          <div className="card-content"></div>
          <div className="card-title">Attendance</div>
        </div>
      </div>
      
      <div className="thought-for-day">
        <h4 className="section-subtitle">Thought for the Day</h4>
        <div className="thought-input-section">
          <div className="message-input">
            <span className="input-icon">💬</span>
            <span className="input-text">Write a Message</span>
          </div>
          <div className="thought-actions">
            <button className="thought-btn upload">Upload</button>
            <button className="thought-btn cancel">Cancel</button>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default QuickAccessCard;
