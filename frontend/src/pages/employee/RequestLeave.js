import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestLeave.css';

const RequestLeave = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromDate: '2025-10-07',
    toDate: '2025-10-07',
    leaveType: 'Sick Leave - 2 days available',
    durationType: 'custom', // 'full' or 'custom'
    customDuration: 'First Half',
    note: '',
    notify: ''
  });

  const [duration, setDuration] = useState(0.5);

  // Calculate duration based on dates and duration type
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      const timeDiff = toDate.getTime() - fromDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      
      if (formData.durationType === 'full') {
        setDuration(daysDiff);
      } else {
        setDuration(daysDiff * 0.5);
      }
    }
  }, [formData.fromDate, formData.toDate, formData.durationType]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDurationTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      durationType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Leave request submitted:', formData);
    alert('Leave request submitted successfully!');
    navigate('/leave');
  };

  const handleCancel = () => {
    navigate('/leave');
  };

  const handleClose = () => {
    navigate('/leave');
  };

  return (
    <div className="request-leave-page">
      <div className="request-leave-container">
        <div className="request-leave-header">
          <h1>Request Leave</h1>
        </div>

        <form className="request-leave-form" onSubmit={handleSubmit}>
          {/* Leave Dates and Duration */}
          <div className="form-section">
            <div className="date-duration-row">
              <div className="date-field">
                <label>From</label>
                <input 
                  type="date" 
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="date-input"
                />
              </div>
              
              <div className="duration-display">
                <span className="duration-text">{duration} days</span>
              </div>
              
              <div className="date-field">
                <label>To</label>
                <input 
                  type="date" 
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="date-input"
                />
              </div>
            </div>
          </div>

          {/* Type of Leave */}
          <div className="form-section">
            <label className="section-label">Select type of leave you want to apply</label>
            <div className="leave-type-dropdown">
              <select 
                name="leaveType" 
                value={formData.leaveType}
                onChange={handleInputChange}
                className="leave-type-select"
              >
                <option value="Sick Leave - 2 days available">Sick Leave - 2 days available</option>
                <option value="Casual Leave - 5 days available">Casual Leave - 5 days available</option>
                <option value="Earned Leave - 10 days available">Earned Leave - 10 days available</option>
                <option value="Comp Off Leave">Comp Off Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>
          </div>

          {/* Leave Duration Type */}
          <div className="form-section">
            <div className="duration-type-buttons">
              <button 
                type="button"
                className={`duration-btn ${formData.durationType === 'full' ? 'active' : 'inactive'}`}
                onClick={() => handleDurationTypeChange('full')}
              >
                Full day
              </button>
              <button 
                type="button"
                className={`duration-btn ${formData.durationType === 'custom' ? 'active' : 'inactive'}`}
                onClick={() => handleDurationTypeChange('custom')}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Custom Duration Details */}
          {formData.durationType === 'custom' && (
            <div className="form-section">
              <label className="custom-duration-label">On {formData.fromDate ? new Date(formData.fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Select date'}</label>
              <div className="custom-duration-dropdown">
                <select 
                  name="customDuration" 
                  value={formData.customDuration}
                  onChange={handleInputChange}
                  className="custom-duration-select"
                >
                  <option value="First Half">First Half</option>
                  <option value="Second Half">Second Half</option>
                </select>
              </div>
            </div>
          )}

          {/* Leave Request Summary */}
          <div className="form-section">
            <div className="leave-summary">
              <span className="summary-icon">⏰</span>
              <span className="summary-text">
                You are requesting for <strong>{duration} days</strong> of leave
              </span>
            </div>
          </div>

          {/* Note Field */}
          <div className="form-section">
            <label className="field-label">Note</label>
            <textarea 
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Type here"
              className="note-textarea"
              rows="3"
            />
          </div>

          {/* Notify Field */}
          <div className="form-section">
            <label className="field-label">Notify</label>
            <input 
              type="text"
              name="notify"
              value={formData.notify}
              onChange={handleInputChange}
              placeholder="Search employee"
              className="notify-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="request-btn">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestLeave;