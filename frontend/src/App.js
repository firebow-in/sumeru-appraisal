import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout and Auth components
import DashboardLayout from './layouts/DashboardLayout';
import AuthGuard from './components/AuthGuard';

// Login page
import LoginPage from './pages/login/LoginPage';

// Employee pages
import EmployeeDashboard from './pages/employee/DashboardPage';
import Insights from './pages/employee/Insights';
import Members from './pages/employee/Members';
import Appraisal from './pages/employee/Appraisal';
import AppraisalForm from './pages/employee/AppraisalForm';
import AppraisalView from './pages/employee/AppraisalView';
import RequestLeave from './pages/employee/RequestLeave';
import TimeOff from './pages/employee/TimeOff';
import LeaveHistory from './pages/employee/LeaveHistory';
import AttendanceTracker from './pages/employee/AttendanceTracker';
import ProfilePage from './pages/employee/ProfilePage';
import SendFeedback from './pages/employee/SendFeedback';
import ReceiveFeedback from './pages/employee/ReceiveFeedback';

// Role-specific dashboards
import HrDashboard from './pages/hr/HrDashboard';
import PmDashboard from './pages/project-manager/PmDashboard';
import CeoDashboard from './pages/ceo/CeoDashboard';
// InternDashboard removed or not available

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Employee Dashboard with Layout */}
          <Route path="/employee/dashboard" element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }>
            <Route index element={<EmployeeDashboard />} />
            <Route path="insights" element={<Insights />} />
            
            {/* Feedback parent with nested routes */}
            <Route path="feedback">
              <Route path="send" element={<SendFeedback />} />
              <Route path="receive" element={<ReceiveFeedback />} />
            </Route>
            
            <Route path="members" element={<Members />} />
            <Route path="appraisal" element={<Appraisal />} />
            <Route path="appraisal-form" element={<AppraisalForm />} />
            <Route path="appraisal-view" element={<AppraisalView />} />
            <Route path="request-leave" element={<RequestLeave />} />
            <Route path="time-off" element={<TimeOff />} />
            <Route path="leave-history" element={<LeaveHistory />} />
            <Route path="attendance-tracker" element={<AttendanceTracker />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* Other Role-specific Dashboard Routes */}
          <Route path="/hr/dashboard" element={<HrDashboard />} />
          <Route path="/project-manager/dashboard" element={<PmDashboard />} />
          <Route path="/ceo/dashboard" element={<CeoDashboard />} />
          {/** Intern dashboard route disabled until component exists **/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
