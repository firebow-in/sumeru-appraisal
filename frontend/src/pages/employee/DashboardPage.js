import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import AppraisalProgress from '../../components/AppraisalProgress';
import TimeOffPopup from '../../components/TimeOffPopup';
import ProfileDropdown from '../../components/ProfileDropdown';
import { authService } from '../../services/auth';
import { getInsightsAppraisalProgress } from '../../utils/insightsData';
import { 
  getTotalWorkingDaysInMonth, 
  getAttendedDaysInCurrentMonth, 
  getUnscheduledAbsence,
  getCurrentMonthName
} from '../../utils/attendanceUtils';

const DashboardPage = () => {
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

  const handleRequestLeave = () => {
    navigate('/employee/dashboard/request-leave');
  };

  // Read appraisal progress from Insights page structure
  useEffect(() => {
    // Get the same percentage that Insights page shows
    const insightsProgress = getInsightsAppraisalProgress();
    setAppraisalProgress(insightsProgress);
  }, []);

  // Load leave requests from localStorage
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  }, []);

  // Load profile data from auth service and localStorage
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

  // Calculate attendance statistics
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

  // Listen for new leave requests and attendance changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      setLeaveRequests(savedRequests);
      
      // Recalculate attendance stats
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

  // Keep appraisal progress at 71% to match Insights page
  // This should be the same percentage shown in the Insights page

  const handleTimeOff = () => {
    setShowTimeOffPopup(true);
  };

  const handleCloseTimeOffPopup = () => {
    setShowTimeOffPopup(false);
    // Refresh leave requests when popup closes
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  };

  const handleAppraisal = () => {
    navigate('/employee/dashboard/appraisal');
  };


  const handleLeaveHistory = () => {
    navigate('/employee/dashboard/leave-history');
  };

  const handleAttendance = () => {
    navigate('/employee/dashboard/attendance-tracker');
  };

  const handleSendFeedback = () => {
    navigate('/employee/dashboard/feedback/send');
  };

  const handleReceiveFeedback = () => {
    navigate('/employee/dashboard/feedback/received');
  };

  const handleInsights = () => {
    navigate('/employee/dashboard/insights');
  };

  const handleMembers = () => {
    navigate('/employee/dashboard/members');
  };

  return (
    <div className="modern-dashboard">
      {/* Main Dashboard Content */}
      <div className="dashboard-frame">
        {/* Header Section */}
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

        {/* Top Row - Attendance Profile & Top Performer */}
        <div className="top-row">
          <div className="attendance-profile-card">
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

          <div className="top-performer-card">
            <h3 className="performer-title">Top Performer of the Month</h3>
            <div className="performer-content">
              <div className="performer-info">
                <div className="performer-name-badge">ABC</div>
                <div className="performer-role">Junior Web Developer</div>
              </div>
              <div className="performer-avatar">
                <div className="performer-image"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Leave Summary & Appraisal */}
        <div className="middle-row">
          <div className="leave-summary-section">
            <h3 className="section-title">Leave Summary</h3>
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
              <button className="action-btn primary" onClick={handleRequestLeave}>
                Request Leave
              </button>
              <button className="action-btn secondary" onClick={handleTimeOff}>
                Time OFF
              </button>
            </div>
          </div>

          <div className="appraisal-section" onClick={handleAppraisal} style={{cursor: 'pointer'}}>
            <AppraisalProgress percentage={appraisalProgress} />
          </div>
        </div>

        {/* Bottom Row - Announcements & Quick Access */}
        <div className="bottom-row">
          <div className="announcement-section">
            <h3 className="section-title">Company Announcement</h3>
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
          </div>

          <div className="quick-access-section">
            <div className="leave-attend-cards">
              <div className="quick-card" onClick={handleLeaveHistory} style={{cursor: 'pointer'}}>
                <div className="card-content"></div>
                <div className="card-title">Leave history</div>
              </div>
              <div className="quick-card" onClick={handleAttendance} style={{cursor: 'pointer'}}>
                <div className="card-content"></div>
                <div className="card-title">Attendence</div>
              </div>
            </div>

            <div className="thought-for-day">
              <h3 className="section-title">Thought for the Day</h3>
              <div className="thought-input-section">
                <div className="message-input">
                  <span className="input-icon">💬</span>
                  <span className="input-text">Write a Message</span>
                </div>
                <div className="thought-actions">
                  <button className="thought-btn upload">Upload</button>
                  <button className="thought-btn cancel">Cancel</button>
                </div>
                <div className="menu-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TimeOffPopup 
        isOpen={showTimeOffPopup} 
        onClose={handleCloseTimeOffPopup} 
      />
    </div>
  );
};

export default DashboardPage;
