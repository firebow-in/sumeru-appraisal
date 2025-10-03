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

// Configuration
import { dashboardLayouts, getResponsiveLayout } from '../../config/dashboardLayout';

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

const ConfigurableDashboard = ({ layoutType = 'default' }) => {
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
  const [currentLayout, setCurrentLayout] = useState(dashboardLayouts[layoutType]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle responsive layout changes
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      
      // Auto-switch layout based on screen size if using default
      if (layoutType === 'default') {
        setCurrentLayout(getResponsiveLayout(newWidth));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layoutType]);

  // All your existing useEffect hooks
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

  // Event handlers
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

  // Component mapping
  const componentMap = {
    HeaderCard: () => (
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
    ),
    AttendanceCard: () => (
      <AttendanceCard 
        profileData={profileData} 
        attendanceStats={attendanceStats} 
      />
    ),
    TopPerformerCard: () => <TopPerformerCard />,
    LeaveSummaryCard: () => (
      <LeaveSummaryCard 
        onRequestLeave={handleRequestLeave}
        onTimeOff={handleTimeOff}
      />
    ),
    AppraisalCard: () => (
      <AppraisalCard 
        percentage={appraisalProgress}
        onClick={handleAppraisal}
      />
    ),
    AnnouncementCard: () => <AnnouncementCard />,
    QuickAccessCard: () => (
      <QuickAccessCard 
        onLeaveHistory={handleLeaveHistory}
        onAttendance={handleAttendance}
      />
    )
  };

  // Render cards based on configuration
  const renderCards = () => {
    return currentLayout.cards
      .sort((a, b) => a.order - b.order)
      .map((cardConfig) => {
        const Component = componentMap[cardConfig.component];
        if (!Component) return null;

        return (
          <div 
            key={cardConfig.id}
            className={`card-span-${cardConfig.span}`}
            style={{ order: cardConfig.order }}
          >
            <Component />
          </div>
        );
      });
  };

  return (
    <div className="modern-dashboard">
      <div className="dashboard-frame">
        <DashboardGrid 
          columns={currentLayout.grid.columns} 
          gap={currentLayout.grid.gap}
        >
          {renderCards()}
        </DashboardGrid>
      </div>
      
      <TimeOffPopup 
        isOpen={showTimeOffPopup} 
        onClose={handleCloseTimeOffPopup} 
      />
    </div>
  );
};

export default ConfigurableDashboard;
