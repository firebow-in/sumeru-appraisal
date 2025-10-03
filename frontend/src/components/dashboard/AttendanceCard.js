import React from 'react';
import DashboardCard from './DashboardCard';

const AttendanceCard = ({ profileData, attendanceStats }) => {
  return (
    <DashboardCard 
      size="medium" 
      className="card-span-2"
    >
      <div className="card-content-row">
        <div className="employee-avatar">
          {profileData.profileImage ? (
            <img 
              src={profileData.profileImage} 
              alt="Profile" 
              className="employee-image"
            />
          ) : (
            <div className="employee-initial">
              {profileData.name ? profileData.name.charAt(0) : 'A'}
            </div>
          )}
        </div>
        <div className="attendance-stats">
          <div className="stat-column">
            <div className="stat-label">Total office days</div>
            <div className="stat-value">{attendanceStats.totalWorkingDays}</div>
          </div>
          <div className="stat-column">
            <div className="stat-label">Attended days</div>
            <div className="stat-value">{attendanceStats.attendedDays}</div>
          </div>
          <div className="stat-column">
            <div className="stat-label">Unscheduled Absence</div>
            <div className="stat-value">{attendanceStats.unscheduledAbsence}</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AttendanceCard;
