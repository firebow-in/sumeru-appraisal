import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import AppraisalProgress from '../../components/AppraisalProgress';
import TimeOffPopup from '../../components/TimeOffPopup';
import ProfileDropdown from '../../components/ProfileDropdown';
import { getInsightsAppraisalProgress } from '../../utils/insightsData';
import { 
  getTotalWorkingDaysInMonth, 
  getAttendedDaysInCurrentMonth, 
  getLeaveDaysInCurrentMonth, 
  getUnscheduledAbsence,
  getCurrentMonthName,
  getCurrentYear
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
  const [thoughtText, setThoughtText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const thoughtInputRef = React.useRef(null);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const [currentHolidayIndex, setCurrentHolidayIndex] = useState(0);

  const handleRequestLeave = () => {
    navigate('/request-leave');
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

  // Load profile data
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('employeeProfile') || '{}');
    setProfileData(savedProfile);
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

  };


  const handleLeaveHistory = () => {
    navigate('/leave-history');
  };

  const handleAttendance = () => {
    navigate('/attendance-tracker');
  };

  // Generate upcoming holidays for current year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const holidays = [
      {
        name: "New Year",
        date: new Date(currentYear, 0, 1),
        type: "National Holiday",
        emoji: "🎊"
      },
      {
        name: "Republic Day",
        date: new Date(currentYear, 0, 26),
        type: "National Holiday",
        emoji: "🇮🇳"
      },
      {
        name: "Holi",
        date: new Date(currentYear, 2, 14),
        type: "Floater Leave",
        emoji: "🎨"
      },
      {
        name: "Eid al-Fitr",
        date: new Date(currentYear, 3, 10),
        type: "Floater Leave",
        emoji: "🌙"
      },
      {
        name: "Independence Day",
        date: new Date(currentYear, 7, 15),
        type: "National Holiday",
        emoji: "🇮🇳"
      },
      {
        name: "Diwali",
        date: new Date(currentYear, 9, 20),
        type: "National Holiday",
        emoji: "🪔"
      },
      {
        name: "Christmas",
        date: new Date(currentYear, 11, 25),
        type: "National Holiday",
        emoji: "🎄"
      }
    ];

    // Filter holidays that are upcoming (within next 6 months)
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getTime() + (180 * 24 * 60 * 60 * 1000));
    
    const upcoming = holidays
      .filter(holiday => holiday.date >= now && holiday.date <= sixMonthsFromNow)
      .sort((a, b) => a.date - b.date);

    setUpcomingHolidays(upcoming);
  }, []);

  // Auto-rotate holidays every 5 seconds if multiple holidays
  useEffect(() => {
    if (upcomingHolidays.length > 1) {
      const interval = setInterval(() => {
        setCurrentHolidayIndex((prev) => (prev + 1) % upcomingHolidays.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [upcomingHolidays.length]);

  const emojiList = [
    '😀','😁','😂','🤣','😊','😇','🙂','😉','😍','😘','😎','🤩','🤗','🤝','👍','👏','🙏','💪','🔥','✨','🎉','🥳','💡','✅','📢'
  ];

  const insertEmoji = (emoji) => {
    const input = thoughtInputRef.current;
    if (!input) {
      setThoughtText(prev => prev + emoji);
      return;
    }
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const before = thoughtText.slice(0, start);
    const after = thoughtText.slice(end);
    const next = `${before}${emoji}${after}`;
    setThoughtText(next);
    // put cursor after inserted emoji
    requestAnimationFrame(() => {
      input.focus();
      const pos = start + emoji.length;
      input.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="header">
        <h1>Good Morning, {profileData.name || 'XYZ'}</h1>
        <div className="header-actions">
          <div className="notification-icon">🔔</div>
          <ProfileDropdown />
        </div>
      </div>

      {/* Employee Overview and Top Performer */}
      <div className="top-section">
        <div className="employee-overview-card">
          <div className="employee-photo-placeholder">
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="employee-profile-image"
              />
            ) : (
              <div className="employee-initial">
                {profileData.name ? profileData.name.charAt(0) : 'A'}
              </div>
            )}
          </div>
          <div className="employee-stats">
            <div className="stat-item">
              <span className="stat-label">Total office days ({getCurrentMonthName()})</span>
              <span className="stat-value">{attendanceStats.totalWorkingDays}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Attended days</span>
              <span className="stat-value">{attendanceStats.attendedDays}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Unscheduled Absence</span>
              <span className="stat-value">{attendanceStats.unscheduledAbsence}</span>
            </div>
          </div>
        </div>

        <div className="top-performer-card">
          <div className="performer-content">
            <h2 className="performer-title">Top Performer of the Month ({getCurrentMonthName()})</h2>
            <div className="performer-info">
              <div className="performer-badge">ABC</div>
              <div className="performer-role">Junior Web Developer</div>
            </div>
          </div>
          <div className="performer-photo-placeholder"></div>
        </div>
      </div>

      {/* Leave Summary and Appraisal */}
      <div className="middle-section">
        <div className="leave-summary-card">
          <h3>Leave Summary</h3>
          <div className="leave-types-grid">
            <div className="leave-type-item">
              <div className="leave-count-box">02</div>
              <div className="leave-label">Sick Leave</div>
            </div>
            <div className="leave-type-item">
              <div className="leave-count-box">03</div>
              <div className="leave-label">Casual Leave</div>
            </div>
            <div className="leave-type-item">
              <div className="leave-count-box">00</div>
              <div className="leave-label">Earned Leave</div>
            </div>
            <div className="leave-type-item">
              <div className="leave-count-box">01</div>
              <div className="leave-label">Compof</div>
            </div>
            <div className="leave-type-item">
              <div className="leave-count-box">01</div>
              <div className="leave-label">Sandwich Leave</div>
            </div>
            <div className="leave-type-item">
              <div className="leave-count-box">01</div>
              <div className="leave-label">Unpaid Leave</div>
            </div>
          </div>
        </div>

        <div className="appraisal-card" onClick={handleAppraisal} style={{cursor: 'pointer'}}>
          <AppraisalProgress percentage={appraisalProgress} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="announcement-card">
          <h3>Company Announcement</h3>
          {upcomingHolidays.length > 0 && (
            <div className="holiday-announcement-container">
              <div className="holiday-announcement-header">
                <span className="holiday-label">🎉 Holidays</span>
                <a href="/holidays" className="view-all-holidays">View All</a>
              </div>
              <div className="holiday-card-container">
                <div className="holiday-announcement-card">
                  <div className="holiday-card-content">
                    <div className="holiday-main-info">
                      <h4 className="holiday-title">{upcomingHolidays[currentHolidayIndex].name}</h4>
                      <p className="holiday-date">
                        {upcomingHolidays[currentHolidayIndex].date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                      <span className={`holiday-type-badge ${upcomingHolidays[currentHolidayIndex].type.toLowerCase().replace(' ', '-')}`}>
                        {upcomingHolidays[currentHolidayIndex].type}
                      </span>
                    </div>
                    <div className="holiday-festive-elements">
                      <div className="main-holiday-emoji">{upcomingHolidays[currentHolidayIndex].emoji}</div>
                      <div className="confetti-element">🎉</div>
                      <div className="flag-element">🏳️</div>
                      <div className="tree-element">🌲</div>
                    </div>
                  </div>
                </div>
                {upcomingHolidays.length > 1 && (
                  <div className="holiday-indicators">
                    {upcomingHolidays.map((_, index) => (
                      <button
                        key={index}
                        className={`holiday-indicator ${index === currentHolidayIndex ? 'active' : ''}`}
                        onClick={() => setCurrentHolidayIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="quick-access-section">
          <div className="quick-access-cards">
            <div className="quick-access-card leave-history" onClick={handleLeaveHistory} style={{cursor: 'pointer'}}>
              <div className="card-placeholder">
                <div className="clock-icon"></div>
              </div>
              <span className="card-label">Leave history</span>
            </div>
            <div className="quick-access-card attendance" onClick={handleAttendance} style={{cursor: 'pointer'}}>
              <div className="card-placeholder">
                <div className="clock-face">
                  <div className="second-hand"></div>
                </div>
              </div>
              <span className="card-label">Attendance</span>
            </div>
          </div>
          
          {/* Thought for the Day Section */}
          <div className="thought-section">
          <div className="thought-card">
              <h3>Thought for the Day</h3>
              <div className="thought-input-container">
                <div className="thought-input">
                  <div className="input-icon"></div>
                  <input 
                    type="text" 
                    ref={thoughtInputRef}
                    value={thoughtText}
                    onChange={(e) => setThoughtText(e.target.value)}
                    placeholder="Write a Message" 
                    className="thought-input-field"
                  />
                  <button
                    type="button"
                    className="emoji-toggle-btn"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Toggle emoji picker"
                  >
                    😊
                  </button>
                </div>
              {showEmojiPicker && (
                <div className="emoji-picker" role="listbox" aria-label="Emoji picker">
                  {emojiList.map((e) => (
                    <button
                      key={e}
                      type="button"
                      className="emoji-btn"
                      onClick={() => insertEmoji(e)}
                      aria-label={`Insert ${e}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
                <div className="thought-buttons">
                  <button className="upload-btn">Upload</button>
                  <button className="cancel-btn">Cancel</button>
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
