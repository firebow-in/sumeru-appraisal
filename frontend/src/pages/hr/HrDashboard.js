import React from 'react';
import { 
  FiUsers, 
  FiUserPlus, 
  FiFileText, 
  FiClipboard, 
  FiEdit3,
  FiBell,
  FiCalendar,
  FiChevronDown
} from 'react-icons/fi';
import './HrDashboard.css';

const HrDashboard = () => {
  const attendanceData = [
    {
      id: 1,
      name: 'Tejas P',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Manasi',
      checkIn: '10:30 AM',
      checkOut: 'Pending',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Venkat',
      checkIn: '09:30 AM',
      checkOut: '06:10 PM',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Nivetha',
      checkIn: '10:00 AM',
      checkOut: 'Pending',
      status: 'pending'
    }
  ];

  const leaveRequests = [
    {
      id: 1,
      name: 'Mark Johnson',
      reason: 'Sick',
      type: 'leave'
    }
  ];

  const attendanceCorrectionRequests = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      reason: 'Forgot Checkout',
      type: 'correction'
    }
  ];

  return (
    <div className="hr-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <img src="/Sumeru_Logo.png" alt="Sumeru Logo" className="logo" />
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item active">
            <FiUsers className="nav-icon" />
            <span>Dashboard</span>
          </div>
          <div className="nav-item">
            <FiUserPlus className="nav-icon" />
            <span>Create User</span>
          </div>
          <div className="nav-item">
            <FiUsers className="nav-icon" />
            <span>Members</span>
          </div>
          <div className="nav-item">
            <FiFileText className="nav-icon" />
            <span>Appraisal</span>
          </div>
          <div className="nav-item">
            <FiClipboard className="nav-icon" />
            <span>Create Forms</span>
          </div>
          <div className="nav-item">
            <FiFileText className="nav-icon" />
            <span>Existing Forms</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Good Morning, HR Name!</h1>
            <div className="header-actions">
              <div className="notification-bell">
                <FiBell />
              </div>
              <div className="profile-image">
                <img src="/api/placeholder/80/80" alt="Profile" />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Top Performer Card */}
          <div className="top-performer-card">
            <h3>Top Performer of the Month</h3>
            <div className="performer-content">
              <div className="performer-info">
                <div className="performer-badge">ABC</div>
                <p>Junior Web Developer</p>
              </div>
              <div className="performer-image">
                <img src="/api/placeholder/100/100" alt="Top Performer" />
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="attendance-overview">
            <div className="section-header">
              <h3>Attendance Overview</h3>
            </div>
            
            <div className="date-selector">
              <FiCalendar className="calendar-icon" />
              <span>Date</span>
              <FiChevronDown className="dropdown-icon" />
            </div>

            <div className="attendance-list">
              {attendanceData.map((employee) => (
                <div key={employee.id} className="attendance-item">
                  <div className="employee-avatar">
                    <img src="/api/placeholder/60/60" alt={employee.name} />
                  </div>
                  <div className="employee-info">
                    <h4>{employee.name}</h4>
                    <div className="attendance-times">
                      <div className="time-group">
                        <div className="status-dot check-in"></div>
                        <div className="time-info">
                          <span className="time-label">Check In</span>
                          <span className="time-value">{employee.checkIn}</span>
                        </div>
                      </div>
                      <div className="time-group">
                        <div className={`status-dot ${employee.status === 'pending' ? 'check-out-pending' : 'check-out'}`}></div>
                        <div className="time-info">
                          <span className="time-label">Check Out</span>
                          <span className={`time-value ${employee.status === 'pending' ? 'pending' : ''}`}>
                            {employee.checkOut}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="edit-icon">
                    <FiEdit3 />
                  </div>
                </div>
              ))}
            </div>

            <button className="view-full-report-btn">View Full Report</button>
          </div>

          {/* Leave & Requests Section */}
          <div className="leave-requests-section">
            <h3>Leave & Requests</h3>
            
            {/* Who's Away Today */}
            <div className="leave-subsection">
              <h4>Who's Away Today?</h4>
              {leaveRequests.map((request) => (
                <div key={request.id} className="leave-request-item">
                  <div className="request-info">
                    <span className="employee-name">{request.name}</span>
                    <span className="leave-reason">{request.reason}</span>
                  </div>
                  <button className="view-btn">View</button>
                </div>
              ))}
            </div>

            <div className="section-divider"></div>

            {/* Attendance Correction Requests */}
            <div className="leave-subsection">
              <h4>Attendance Correction Requests</h4>
              {attendanceCorrectionRequests.map((request) => (
                <div key={request.id} className="correction-request-item">
                  <div className="request-info">
                    <span className="employee-name">{request.name}</span>
                    <span className="correction-reason">{request.reason}</span>
                  </div>
                  <button className="approve-btn">Approve</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
