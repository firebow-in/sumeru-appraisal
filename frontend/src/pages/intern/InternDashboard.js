import React from 'react';
import { FiBookOpen, FiCalendar, FiUser, FiAward } from 'react-icons/fi';
import './InternDashboard.css';

const InternDashboard = () => {
  return (
    <div className="intern-dashboard">
      <div className="dashboard-header">
        <h1>Intern Dashboard</h1>
        <p>Welcome to your learning journey!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiBookOpen />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Completed Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3>45</h3>
            <p>Days Remaining</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiUser />
          </div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Mentors Assigned</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>85%</h3>
            <p>Learning Progress</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h3>Learning Path</h3>
          <div className="learning-list">
            <div className="learning-item completed">
              <span className="learning-name">React Fundamentals</span>
              <span className="learning-status">✓ Completed</span>
            </div>
            <div className="learning-item in-progress">
              <span className="learning-name">Node.js Backend</span>
              <span className="learning-status">🔄 In Progress</span>
            </div>
            <div className="learning-item pending">
              <span className="learning-name">Database Design</span>
              <span className="learning-status">⏳ Pending</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Upcoming Events</h3>
          <div className="events-list">
            <div className="event-item">
              <span className="event-time">Tomorrow 2:00 PM</span>
              <p>Team Standup Meeting</p>
            </div>
            <div className="event-item">
              <span className="event-time">Friday 10:00 AM</span>
              <p>Code Review Session</p>
            </div>
            <div className="event-item">
              <span className="event-time">Next Monday 3:00 PM</span>
              <p>Mentor 1-on-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
