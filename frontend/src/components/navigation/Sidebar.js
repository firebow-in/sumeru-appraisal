import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [feedbackOpen, setFeedbackOpen] = useState(true);

  // Keep Feedback menu open when you're already inside a feedback route
  useEffect(() => {
    if (location.pathname.startsWith('/employee/dashboard/feedback')) {
      setFeedbackOpen(true);
    }
  }, [location.pathname]);

  // Helper function to determine active state
  const getActiveState = (path) => {
    if (path === '/employee/dashboard') {
      return location.pathname === '/employee/dashboard' && !location.pathname.startsWith('/employee/dashboard/feedback');
    }
    if (path.startsWith('/employee/dashboard/feedback')) {
      return location.pathname === path;
    }
    return location.pathname === path && !location.pathname.startsWith('/employee/dashboard/feedback');
  };

  return (
    <aside className="sidebar-root">
      <div className="sidebar-logo">
        <img src="/Sumeru_Logo.png" alt="Sumeru" className="logo-img" />
      </div>
      <nav className="sidebar-menu">
        <NavLink 
          to="/employee/dashboard"
          className={`sidebar-btn${getActiveState('/employee/dashboard') ? ' active' : ''}`}
        >
          <span className="sidebar-icon">▦</span>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/employee/dashboard/insights"
          className={`sidebar-btn${getActiveState('/employee/dashboard/insights') ? ' active' : ''}`}
        >
          <span className="sidebar-icon">📈</span>
          Insights
        </NavLink>
        
        <div>
          <button 
            className={`sidebar-btn${location.pathname.startsWith('/employee/dashboard/feedback') ? ' active' : ''}`}
            onClick={() => setFeedbackOpen(o => !o)}
          >
            <span className="sidebar-icon">🗨️</span>
            Feedback
          </button>
          {feedbackOpen && (
            <div className="sidebar-submenu">
              <NavLink 
                to="/employee/dashboard/feedback/send"
                className={`sidebar-sub-btn${getActiveState('/employee/dashboard/feedback/send') ? ' active' : ''}`}
              >
                <span className="sidebar-icon">✉️</span>
                Send Feedback
              </NavLink>
              <NavLink 
                to="/employee/dashboard/feedback/receive"
                className={`sidebar-sub-btn${getActiveState('/employee/dashboard/feedback/receive') ? ' active' : ''}`}
              >
                <span className="sidebar-icon">✅</span>
                Receive Feedback
              </NavLink>
            </div>
          )}
        </div>
        
        <NavLink 
          to="/employee/dashboard/members"
          className={`sidebar-btn${getActiveState('/employee/dashboard/members') ? ' active' : ''}`}
        >
          <span className="sidebar-icon">👥</span>
          Members
        </NavLink>
        
        <NavLink 
          to="/employee/dashboard/appraisal"
          className={`sidebar-btn${getActiveState('/employee/dashboard/appraisal') ? ' active' : ''}`}
        >
          <span className="sidebar-icon">📋</span>
          Appraisal
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
