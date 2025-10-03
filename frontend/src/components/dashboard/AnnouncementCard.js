import React from 'react';
import DashboardCard from './DashboardCard';

const AnnouncementCard = () => {
  return (
    <DashboardCard 
      title="Company Announcement"
      size="large"
      className="card-span-2"
    >
      <div className="announcement-content">
        <div className="announcement-field">
          <span className="field-label">Title:</span>
        </div>
        <div className="announcement-field">
          <span className="field-label">Date:</span>
        </div>
        <div className="announcement-field">
          <span className="field-label">Description:</span>
        </div>
        <div className="announcement-field">
          <span className="field-label">From:</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AnnouncementCard;
