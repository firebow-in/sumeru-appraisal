import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiUserPlus, 
  FiFileText, 
  FiClipboard, 
  FiEdit3,
  FiBell,
  FiCalendar,
  FiChevronDown,
  FiX,
  FiSearch,
  FiUpload
} from 'react-icons/fi';
import CreateUser from './CreateUser';
import Members from './Members';
import ExistingForms from './ExistingForms';
import FormEdit from './FormEdit';
import FormView from './FormView';
import FormAssignment from './FormAssignment';
import './HrDashboard.css';

const HrDashboard = () => {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [expandedCorrectionId, setExpandedCorrectionId] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'createUser', 'members', etc.
  const [appraisalSubmenuOpen, setAppraisalSubmenuOpen] = useState(false);
  const [activeFormId, setActiveFormId] = useState(null);
  const [activeFormTitle, setActiveFormTitle] = useState('');
  
  const showFormList = () => {
    setCurrentView('existingForms');
    setActiveFormId(null);
  };

  const handleCreateForm = () => {
    setCurrentView('editForm');
    setActiveFormId('new');
  };

  const handleEditForm = (formId) => {
    setCurrentView('editForm');
    setActiveFormId(formId);
  };

  const handleViewForm = (formId) => {
    setCurrentView('viewForm');
    setActiveFormId(formId);
  };

  const handleAssignForm = (formId, formTitle) => {
    setCurrentView('assignForm');
    setActiveFormId(formId);
    setActiveFormTitle(formTitle);
  };

  const handleAssignmentSave = (assignmentData) => {
    // Handle form assignment save
    console.log('Form assignment saved:', assignmentData);
    // In a real app, this would make an API call
    alert(`Form assigned to ${assignmentData.employees.length} employee(s) with deadline: ${new Date(assignmentData.deadline).toLocaleString()}`);
    showFormList(); // Return to form list
  };
  
  // Date functionality states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  // Sample attendance data with dates
  const attendanceData = [
    {
      id: 1,
      name: 'Tejas P',
      checkIns: ['09:00 AM', '01:30 PM', '02:00 PM'],
      checkOuts: ['01:00 PM', '02:00 PM', '06:00 PM'],
      totalHours: '9.5 hr',
      date: new Date('2024-01-15'),
      status: 'present'
    },
    {
      id: 2,
      name: 'Manasi',
      checkIns: ['10:30 AM', '01:30 PM', '02:30 AM'],
      checkOuts: ['01:00 PM', '02:00 PM', 'Pending'],
      totalHours: '3hr',
      date: new Date('2024-01-15'),
      status: 'present'
    },
    {
      id: 3,
      name: 'Venkat',
      checkIns: ['09:30 AM', '12:00 PM'],
      checkOuts: ['12:00 PM', '06:10 PM'],
      totalHours: '4.5hr',
      date: new Date('2024-01-15'),
      status: 'present'
    },
    {
      id: 4,
      name: 'Nivetha',
      checkIns: ['10:00 AM'],
      checkOuts: ['Pending'],
      totalHours: '0hr',
      date: new Date('2024-01-15'),
      status: 'present'
    },
    // Previous day data
    {
      id: 5,
      name: 'Tejas P',
      checkIns: ['08:45 AM'],
      checkOuts: ['06:30 PM'],
      totalHours: '9.75 hr',
      date: new Date('2024-01-14'),
      status: 'present'
    },
    {
      id: 6,
      name: 'Manasi',
      checkIns: ['09:15 AM'],
      checkOuts: ['05:45 PM'],
      totalHours: '8.5 hr',
      date: new Date('2024-01-14'),
      status: 'present'
    }
  ];

  // Date filtering functions
  const filterAttendanceByDate = (date) => {
    return attendanceData.filter(employee => {
      const employeeDate = new Date(employee.date);
      return employeeDate.toDateString() === date.toDateString();
    });
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const filtered = filterAttendanceByDate(newDate);
    setFilteredAttendanceData(filtered);
    setIsDatePickerOpen(false);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    handleDateChange(newDate);
  };

  // Initialize filtered data on component mount
  useEffect(() => {
    const filtered = filterAttendanceByDate(selectedDate);
    setFilteredAttendanceData(filtered);
  }, [selectedDate]);

  // Preview for dashboard card (keep minimal)
  const leaveRequests = [
    { id: 1, name: 'Mark Johnson', reason: 'Sick', type: 'leave' }
  ];

  // Full list for modal
  const leaveRequestsAll = [
    { id: 1, name: 'Sumesh Kumar', reason: 'Sick Leave', type: 'leave' },
    { id: 2, name: 'Manasa Shivamma', reason: 'Casual Leave', type: 'leave' },
    { id: 3, name: 'Venkatamma', reason: 'CompOf Leave', type: 'leave' },
    { id: 4, name: 'Rahul Gandhi', reason: 'Earned Leave', type: 'leave' },
    { id: 5, name: 'Anita Rao', reason: 'Maternity Leave', type: 'leave' },
    { id: 6, name: 'Arun Prakash', reason: 'Personal Leave', type: 'leave' }
  ];

  // Preview for dashboard card (keep minimal)
  const attendanceCorrectionRequests = [
    { id: 1, name: 'Rajesh Kumar', reason: 'Forgot Checkout', type: 'correction' }
  ];

  // Full list for modal
  const attendanceCorrectionRequestsAll = [
    { id: 1, name: 'Rajesh Kumar', reason: 'Forgot Checkout', requestedTime: '05:45 PM', type: 'correction' },
    { id: 2, name: 'Manasi Shivamath', reason: 'Forgot Checkin', requestedTime: '09:10 AM', type: 'correction' },
    { id: 3, name: 'Venkataramana', reason: 'Forgot Checkout', requestedTime: '06:05 PM', type: 'correction' },
    { id: 4, name: 'Narendra Modi', reason: 'Work From Home', requestedTime: '—', type: 'correction' },
    { id: 5, name: 'Priya Nair', reason: 'Missed Punch', requestedTime: '—', type: 'correction' },
    { id: 6, name: 'Karthik R', reason: 'Incorrect Timing', requestedTime: '—', type: 'correction' }
  ];

  return (
    <div className="hr-dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <img src="/Sumeru_Logo.png" alt="Sumeru Logo" className="logo" />
        </div>
        
        <nav className="nav-menu">
          <div 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <FiUsers className="nav-icon" />
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'createUser' ? 'active' : ''}`}
            onClick={() => setCurrentView('createUser')}
          >
            <FiUserPlus className="nav-icon" />
            <span>Create User</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'members' ? 'active' : ''}`}
            onClick={() => setCurrentView('members')}
          >
            <FiUsers className="nav-icon" />
            <span>Members</span>
          </div>
          <div className="nav-group">
            <div 
              className={`nav-item ${currentView === 'appraisal' || currentView === 'editForm' || currentView === 'existingForms' || currentView === 'viewForm' ? 'active' : ''}`}
              onClick={() => setAppraisalSubmenuOpen(!appraisalSubmenuOpen)}
            >
              <FiFileText className="nav-icon" />
              <span>Appraisal</span>
              <span className={`nav-arrow ${appraisalSubmenuOpen ? 'open' : ''}`}>▼</span>
            </div>
            {appraisalSubmenuOpen && (
              <div className="nav-submenu">
                <div 
                  className={`nav-subitem ${currentView === 'editForm' && activeFormId === 'new' ? 'active' : ''}`}
                  onClick={handleCreateForm}
                >
                  <FiClipboard className="nav-icon" />
                  <span>Create Form</span>
                </div>
                <div 
                  className={`nav-subitem ${currentView === 'existingForms' ? 'active' : ''}`}
                  onClick={showFormList}
                >
                  <FiFileText className="nav-icon" />
                  <span>Existing Forms</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {currentView === 'createUser' ? (
          <CreateUser onBack={() => setCurrentView('dashboard')} />
        ) : currentView === 'members' ? (
          <Members onBack={() => setCurrentView('dashboard')} />
        ) : currentView === 'appraisal' ? (
          <div className="placeholder-content">
            <h2>Appraisal Management</h2>
            <p>This section will show appraisal forms and allow HR to manage them.</p>
          </div>
        ) : currentView === 'editForm' ? (
          <FormEdit formId={activeFormId} onBack={showFormList} onSave={showFormList} />
        ) : currentView === 'viewForm' ? (
          <FormView formId={activeFormId} onBack={showFormList} onEdit={handleEditForm} />
        ) : currentView === 'assignForm' ? (
          <FormAssignment formId={activeFormId} formTitle={activeFormTitle} onBack={showFormList} onSave={handleAssignmentSave} />
        ) : currentView === 'existingForms' ? (
          <ExistingForms onCreate={handleCreateForm} onEdit={handleEditForm} onView={handleViewForm} onAssign={handleAssignForm} />
        ) : (
          <>
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

          {/* Attendance Overview - Full Height */}
          <div className="attendance-overview">
            <div className="section-header">
              <h3>Attendance Overview</h3>
            </div>
            
            <div className="date-selector" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
              <FiCalendar className="calendar-icon" />
              <span>{formatDateForDisplay(selectedDate)}</span>
              <FiChevronDown className={`dropdown-icon ${isDatePickerOpen ? 'rotated' : ''}`} />
              
              {isDatePickerOpen && (
                <div className="date-picker-dropdown">
                  <div className="date-picker-header">
                    <button 
                      className="date-nav-btn" 
                      onClick={(e) => { e.stopPropagation(); navigateDate(-1); }}
                    >
                      ←
                    </button>
                    <span className="current-date-display">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button 
                      className="date-nav-btn" 
                      onClick={(e) => { e.stopPropagation(); navigateDate(1); }}
                    >
                      →
                    </button>
                  </div>
                  
                  <div className="date-picker-calendar">
                    <div className="calendar-weekdays">
                      <div className="weekday">Sun</div>
                      <div className="weekday">Mon</div>
                      <div className="weekday">Tue</div>
                      <div className="weekday">Wed</div>
                      <div className="weekday">Thu</div>
                      <div className="weekday">Fri</div>
                      <div className="weekday">Sat</div>
                    </div>
                    
                    <div className="calendar-days">
                      {(() => {
                        const year = selectedDate.getFullYear();
                        const month = selectedDate.getMonth();
                        const firstDay = new Date(year, month, 1);
                        const lastDay = new Date(year, month + 1, 0);
                        const startDate = new Date(firstDay);
                        startDate.setDate(startDate.getDate() - firstDay.getDay());
                        
                        const days = [];
                        for (let i = 0; i < 42; i++) {
                          const date = new Date(startDate);
                          date.setDate(startDate.getDate() + i);
                          const isCurrentMonth = date.getMonth() === month;
                          const isSelected = date.toDateString() === selectedDate.toDateString();
                          const isToday = date.toDateString() === new Date().toDateString();
                          
                          days.push(
                            <button
                              key={i}
                              className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                              onClick={(e) => { e.stopPropagation(); handleDateChange(date); }}
                            >
                              {date.getDate()}
                            </button>
                          );
                        }
                        return days;
                      })()}
                    </div>
                  </div>
                  
                  <div className="date-picker-actions">
                    <button 
                      className="today-btn" 
                      onClick={(e) => { e.stopPropagation(); handleDateChange(new Date()); }}
                    >
                      Today
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="attendance-list">
              {filteredAttendanceData.length > 0 ? (
                filteredAttendanceData.map((employee) => (
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
                            <div className="time-values-column">
                              {employee.checkIns.map((time, idx) => (
                                <span key={`in-${employee.id}-${idx}`} className="time-value">{time}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="time-group">
                          <div className={`status-dot ${employee.checkOuts.includes('Pending') ? 'check-out-pending' : 'check-out'}`}></div>
                          <div className="time-info">
                            <span className="time-label">Check Out</span>
                            <div className="time-values-column">
                              {employee.checkOuts.map((time, idx) => (
                                <span key={`out-${employee.id}-${idx}`} className={`time-value ${time === 'Pending' ? 'pending' : ''}`}>
                                  {time}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="attendance-actions">
                      <span className="total-hours">{employee.totalHours}</span>
                      <div className="edit-icon">
                        <FiEdit3 />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-attendance-data">
                  <p>No attendance data available for {formatDateForDisplay(selectedDate)}</p>
                </div>
              )}
            </div>

            <button className="view-full-report-btn" onClick={() => setIsAttendanceModalOpen(true)}>View Full Report</button>
          </div>

          {/* Leave & Requests Section */}
          <div className="leave-requests-section" onClick={() => setIsLeaveModalOpen(true)}>
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
          </>
        )}
      </div>

      {/* Attendance Overview - Full Report Modal */}
      {isAttendanceModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="attendance-modal">
            <button className="modal-close" aria-label="Close" onClick={() => setIsAttendanceModalOpen(false)}>
              <FiX />
            </button>

            <div className="attendance-modal-header">
              <h2>Attendance Overview</h2>

              <div className="attendance-modal-controls">
                <div className="modal-date-picker" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                  <FiCalendar />
                  <span>{formatDateForDisplay(selectedDate)}</span>
                  <FiChevronDown className={`dropdown-icon ${isDatePickerOpen ? 'rotated' : ''}`} />
                </div>

                <div className="modal-search">
                  <FiSearch />
                  <input type="text" placeholder="Search..." aria-label="Search" />
                </div>

                <button className="modal-export">
                  <FiUpload />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="attendance-modal-body">
              <div className="attendance-modal-panel">
                <div className="attendance-modal-list">
                  {filteredAttendanceData.length > 0 ? (
                    filteredAttendanceData.map((employee) => (
                    <div key={`modal-${employee.id}`} className="attendance-item">
                      <div className="employee-avatar">
                        <img src="/api/placeholder/60/60" alt={employee.name} />
                      </div>

                      <div className="employee-details-container">
                        <h4>{employee.name}</h4>
                        <div className="attendance-times">
                          <div className="time-group">
                            <div className="status-dot check-in"></div>
                            <div className="time-info">
                              <span className="time-label">Check In</span>
                              <div className="time-values-column">
                                {employee.checkIns.map((t, idx) => (
                                  <span key={`in-${employee.id}-${idx}`} className="time-value">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="time-group">
                            <div className="status-dot check-out"></div>
                            <div className="time-info">
                              <span className="time-label">Check Out</span>
                              <div className="time-values-column">
                                {employee.checkOuts.map((t, idx) => (
                                  <span key={`out-${employee.id}-${idx}`} className={`time-value ${t === 'Pending' ? 'pending' : ''}`}>{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="attendance-actions">
                        <span className="total-hours">{employee.totalHours}</span>
                        <div className="edit-icon"><FiEdit3 /></div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="no-attendance-data">
                      <p>No attendance data available for {formatDateForDisplay(selectedDate)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave & Requests Modal (blurred background) */}
      {isLeaveModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="leave-modal">
            <button className="modal-close" aria-label="Close" onClick={() => setIsLeaveModalOpen(false)}>
              <FiX />
            </button>

            <div className="leave-modal-body">
              <div className="leave-columns">
                <div className="leave-column">
                  <h3>Leave</h3>
                  <div className="leave-list">
                    {leaveRequestsAll.map((item) => (
                      <div key={`leave-${item.id}`} className="leave-card">
                        <div className="leave-card-info">
                          <div className="leave-card-name">{item.name}</div>
                          <div className="leave-card-type">{item.reason}</div>
                        </div>
                        <button className="btn-view">View</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="leave-column">
                  <h3>Attendance Correction Requests</h3>
                  <div className="correction-list">
                    {attendanceCorrectionRequestsAll.map((item) => {
                      const isOpen = expandedCorrectionId === item.id;
                      return (
                        <div
                          key={`corr-${item.id}`}
                          className={`correction-card${isOpen ? ' expanded' : ''}`}
                          onClick={() => setExpandedCorrectionId(isOpen ? null : item.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedCorrectionId(isOpen ? null : item.id); }}
                        >
                          <div className="correction-card-info">
                            <div className="correction-card-name">{item.name}</div>
                            <div className="correction-card-reason">{item.reason}</div>
                            {isOpen && (
                              <div className="correction-detail">
                                <div className="detail-line">Request manual {item.reason.toLowerCase().includes('checkin') ? 'check-in' : 'checkout'} for <strong>{item.requestedTime}</strong>.</div>
                                <div className="detail-reason">Reason : <span>{item.reason}</span></div>
                              </div>
                            )}
                          </div>
                          <div className="correction-actions" onClick={(e) => e.stopPropagation()}>
                            <button className="btn-approve">Approve</button>
                            <button className="btn-cancel">Cancel</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;
