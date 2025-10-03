import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

// Dashboard Components
import DashboardGrid from '../../components/dashboard/DashboardGrid';
import DashboardCard from '../../components/dashboard/DashboardCard';
import AttendanceCard from '../../components/dashboard/AttendanceCard';
import TopPerformerCard from '../../components/dashboard/TopPerformerCard';
import LeaveSummaryCard from '../../components/dashboard/LeaveSummaryCard';
import AppraisalCard from '../../components/dashboard/AppraisalCard';
import AnnouncementCard from '../../components/dashboard/AnnouncementCard';
import QuickAccessCard from '../../components/dashboard/QuickAccessCard';

// Other Components
import TimeOffPopup from '../../components/TimeOffPopup';
import { authService } from '../../services/auth';
import { getInsightsAppraisalProgress } from '../../utils/insightsData';
import { 
  getTotalWorkingDaysInMonth, 
  getAttendedDaysInCurrentMonth, 
  getUnscheduledAbsence,
  getCurrentMonthName
} from '../../utils/attendanceUtils';

const ModularDashboard = () => {
  const navigate = useNavigate();
  const [appraisalProgress, setAppraisalProgress] = useState(71);
  const [showTimeOffPopup, setShowTimeOffPopup] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalWorkingDays: 0,
    attendedDays: 0,
    unscheduledAbsence: 0
  });
  const [profileData, setProfileData] = useState({});

  // All your existing useEffect hooks remain the same
  useEffect(() => {
    const insightsProgress = getInsightsAppraisalProgress();
    setAppraisalProgress(insightsProgress);
  }, []);

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser();
    const savedProfile = JSON.parse(localStorage.getItem('employeeProfile') || '{}');
    
    if (user) {
      setProfileData({
        name: user.displayName || 'User',
        email: user.email || 'user@company.com',
        role: user.department || 'Employee',
        ...savedProfile
      });
    } else {
      setProfileData(savedProfile);
    }
  }, []);

  useEffect(() => {
    const totalWorkingDays = getTotalWorkingDaysInMonth();
    const attendedDays = getAttendedDaysInCurrentMonth();
    const unscheduledAbsence = getUnscheduledAbsence();
    
    setAttendanceStats({
      totalWorkingDays,
      attendedDays,
      unscheduledAbsence
    });
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      setLeaveRequests(savedRequests);
      
      const totalWorkingDays = getTotalWorkingDaysInMonth();
      const attendedDays = getAttendedDaysInCurrentMonth();
      const unscheduledAbsence = getUnscheduledAbsence();
      
      setAttendanceStats({
        totalWorkingDays,
        attendedDays,
        unscheduledAbsence
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // All your existing handler functions remain the same
  const handleRequestLeave = () => navigate('/employee/dashboard/request-leave');
  const handleTimeOff = () => setShowTimeOffPopup(true);
  const handleCloseTimeOffPopup = () => {
    setShowTimeOffPopup(false);
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  };
  const handleAppraisal = () => navigate('/employee/dashboard/appraisal');
  const handleLeaveHistory = () => navigate('/employee/dashboard/leave-history');
  const handleAttendance = () => navigate('/employee/dashboard/attendance-tracker');

  return (
    <div className="modern-dashboard">
      <div className="dashboard-frame">
        {/* Header Section */}
        <DashboardCard size="small" className="card-span-full">
          <div className="dashboard-header">
            <h1 className="greeting-text">Good Morning, {profileData.name || 'XYZ'}!</h1>
            <div className="header-actions">
              <div className="notification-container">
                <div className="notification-badge">
                  <div className="notification-icon">🔔</div>
                </div>
              </div>
              <div className="profile-avatar">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-initial">
                    {profileData.name ? profileData.name.charAt(0) : 'U'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Flexible Grid Layout */}
        <DashboardGrid columns="2" gap="16px">
          {/* Top Row */}
          <AttendanceCard 
            profileData={profileData} 
            attendanceStats={attendanceStats} 
          />
          <TopPerformerCard />

          {/* Middle Row */}
          <LeaveSummaryCard 
            onRequestLeave={handleRequestLeave}
            onTimeOff={handleTimeOff}
          />
          <AppraisalCard 
            percentage={appraisalProgress}
            onClick={handleAppraisal}
          />

          {/* Bottom Row */}
          <AnnouncementCard />
          <QuickAccessCard 
            onLeaveHistory={handleLeaveHistory}
            onAttendance={handleAttendance}
          />
        </DashboardGrid>
      </div>
      
      <TimeOffPopup 
        isOpen={showTimeOffPopup} 
        onClose={handleCloseTimeOffPopup} 
      />
    </div>
  );
};

export default ModularDashboard;
