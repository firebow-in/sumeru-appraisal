import React from 'react';
import { FiTrendingUp, FiDollarSign, FiUsers, FiAward } from 'react-icons/fi';
import './CeoDashboard.css';

const CeoDashboard = () => {
  return (
    <div className="ceo-dashboard">
      <div className="dashboard-header">
        <h1>Executive Dashboard</h1>
        <p>Welcome to the CEO portal</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <h3>$2.4M</h3>
            <p>Revenue This Quarter</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>156</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>94%</h3>
            <p>Employee Satisfaction</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3>18%</h3>
            <p>Growth Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h3>Key Performance Indicators</h3>
          <div className="kpi-list">
            <div className="kpi-item">
              <span className="kpi-label">Customer Satisfaction</span>
              <span className="kpi-value">96%</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-label">Employee Retention</span>
              <span className="kpi-value">92%</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-label">Market Share</span>
              <span className="kpi-value">15%</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-label">Profit Margin</span>
              <span className="kpi-value">28%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Strategic Initiatives</h3>
          <div className="initiatives-list">
            <div className="initiative-item">
              <span className="initiative-name">Digital Transformation</span>
              <span className="initiative-status on-track">On Track</span>
            </div>
            <div className="initiative-item">
              <span className="initiative-name">Market Expansion</span>
              <span className="initiative-status in-progress">In Progress</span>
            </div>
            <div className="initiative-item">
              <span className="initiative-name">Sustainability Program</span>
              <span className="initiative-status completed">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoDashboard;
