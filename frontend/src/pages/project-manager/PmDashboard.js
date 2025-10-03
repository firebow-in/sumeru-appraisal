import React from 'react';
import { FiFolder, FiUsers, FiCalendar, FiTarget } from 'react-icons/fi';
import './PmDashboard.css';

const PmDashboard = () => {
  return (
    <div className="pm-dashboard">
      <div className="dashboard-header">
        <h1>Project Management Dashboard</h1>
        <p>Welcome to the Project Management portal</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiFolder />
          </div>
          <div className="stat-content">
            <h3>24</h3>
            <p>Active Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>89</h3>
            <p>Team Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Deadlines This Week</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiTarget />
          </div>
          <div className="stat-content">
            <h3>87%</h3>
            <p>Project Completion</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h3>Project Overview</h3>
          <div className="project-list">
            <div className="project-item">
              <span className="project-name">E-commerce Platform</span>
              <span className="project-status completed">Completed</span>
            </div>
            <div className="project-item">
              <span className="project-name">Mobile App Development</span>
              <span className="project-status in-progress">In Progress</span>
            </div>
            <div className="project-item">
              <span className="project-name">Data Migration</span>
              <span className="project-status pending">Pending</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Team Performance</h3>
          <div className="performance-metrics">
            <div className="metric">
              <span className="metric-label">Productivity</span>
              <span className="metric-value">92%</span>
            </div>
            <div className="metric">
              <span className="metric-label">On-time Delivery</span>
              <span className="metric-value">88%</span>
            </div>
            <div className="metric">
              <span className="metric-label">Quality Score</span>
              <span className="metric-value">95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PmDashboard;
