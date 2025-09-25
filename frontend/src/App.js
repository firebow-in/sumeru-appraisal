import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import DashboardPage from './pages/DashboardPage';
import Insights from './pages/Insights';
import Members from './pages/Members';
import Appraisal from './pages/Appraisal';

// add your feedback subpages
import SendFeedback from './pages/SendFeedback';
import ReceiveFeedback from './pages/ReceiveFeedback';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardPage />} />
            <Route path="insights" element={<Insights />} />
            
            {/* Feedback parent with nested routes */}
            <Route path="feedback">
              <Route path="send" element={<SendFeedback />} />
              <Route path="receive" element={<ReceiveFeedback />} />
            </Route>
            
            <Route path="members" element={<Members />} />
            <Route path="appraisal" element={<Appraisal />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
