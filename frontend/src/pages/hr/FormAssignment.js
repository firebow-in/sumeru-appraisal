import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiSave, 
  FiUsers, 
  FiCalendar,
  FiClock,
  FiUser,
  FiUserCheck,
  FiSend,
  FiX,
  FiPlus,
  FiSearch
} from 'react-icons/fi';
import './FormAssignment.css';

const FormAssignment = ({ formId, formTitle, onBack, onSave }) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchManager, setSearchManager] = useState('');
  const [showEmployeeSearch, setShowEmployeeSearch] = useState(false);
  const [showManagerSearch, setShowManagerSearch] = useState(false);

  // Sample employee and manager data
  const sampleEmployees = [
    { id: 1, name: 'John Smith', department: 'Engineering', position: 'Software Developer', email: 'john.smith@company.com' },
    { id: 2, name: 'Sarah Johnson', department: 'Marketing', position: 'Marketing Manager', email: 'sarah.johnson@company.com' },
    { id: 3, name: 'Mike Wilson', department: 'Sales', position: 'Sales Representative', email: 'mike.wilson@company.com' },
    { id: 4, name: 'Emily Davis', department: 'HR', position: 'HR Specialist', email: 'emily.davis@company.com' },
    { id: 5, name: 'David Brown', department: 'Engineering', position: 'Senior Developer', email: 'david.brown@company.com' },
    { id: 6, name: 'Lisa Anderson', department: 'Finance', position: 'Financial Analyst', email: 'lisa.anderson@company.com' }
  ];

  const sampleManagers = [
    { id: 1, name: 'Robert Taylor', department: 'Engineering', position: 'Engineering Manager', email: 'robert.taylor@company.com' },
    { id: 2, name: 'Jennifer Lee', department: 'Marketing', position: 'Marketing Director', email: 'jennifer.lee@company.com' },
    { id: 3, name: 'Michael Chen', department: 'Sales', position: 'Sales Director', email: 'michael.chen@company.com' },
    { id: 4, name: 'Amanda White', department: 'HR', position: 'HR Director', email: 'amanda.white@company.com' },
    { id: 5, name: 'James Wilson', department: 'Finance', position: 'Finance Director', email: 'james.wilson@company.com' }
  ];

  useEffect(() => {
    // Simulate API call to load form details
    const timer = setTimeout(() => {
      setForm({
        id: formId,
        title: formTitle || 'Annual Performance Review',
        description: 'Comprehensive annual performance evaluation form for all employees',
        category: 'Performance'
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formId, formTitle]);

  const handleEmployeeSelect = (employee) => {
    if (!selectedEmployees.find(emp => emp.id === employee.id)) {
      setSelectedEmployees(prev => [...prev, employee]);
    }
    setShowEmployeeSearch(false);
    setSearchEmployee('');
  };

  const handleManagerSelect = (manager) => {
    if (!selectedManagers.find(mgr => mgr.id === manager.id)) {
      setSelectedManagers(prev => [...prev, manager]);
    }
    setShowManagerSearch(false);
    setSearchManager('');
  };

  const handleRemoveEmployee = (employeeId) => {
    setSelectedEmployees(prev => prev.filter(emp => emp.id !== employeeId));
  };

  const handleRemoveManager = (managerId) => {
    setSelectedManagers(prev => prev.filter(mgr => mgr.id !== managerId));
  };

  const handleSave = async () => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee to assign this form to.');
      return;
    }

    if (!deadline) {
      alert('Please set a deadline for this form assignment.');
      return;
    }

    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    
    if (onSave) {
      onSave({
        formId,
        employees: selectedEmployees,
        managers: selectedManagers,
        deadline,
        assignedDate: new Date().toISOString()
      });
    }
  };

  const filteredEmployees = sampleEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  const filteredManagers = sampleManagers.filter(mgr => 
    mgr.name.toLowerCase().includes(searchManager.toLowerCase()) ||
    mgr.department.toLowerCase().includes(searchManager.toLowerCase()) ||
    mgr.position.toLowerCase().includes(searchManager.toLowerCase())
  );

  if (loading) {
    return (
      <div className="form-assignment-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading form for assignment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-assignment-container">
      {/* Header */}
      <div className="form-assignment-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <FiArrowLeft />
            Back to Forms
          </button>
          <div className="form-title-section">
            <h1>Assign Form: {form.title}</h1>
            <p className="form-description">{form.description}</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary" 
            onClick={handleSave}
            disabled={saving || selectedEmployees.length === 0 || !deadline}
          >
            {saving ? (
              <>
                <div className="spinner-small"></div>
                Assigning...
              </>
            ) : (
              <>
                <FiSend />
                Assign Form
              </>
            )}
          </button>
        </div>
      </div>

      {/* Assignment Content */}
      <div className="form-assignment-content">
        <div className="assignment-grid">
          {/* Employee Selection */}
          <div className="assignment-card">
            <div className="card-header">
              <h3>
                <FiUsers />
                Select Employees
              </h3>
              <span className="required-badge">Required</span>
            </div>
            <div className="card-content">
              <div className="search-section">
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search employees by name, department, or position..."
                    value={searchEmployee}
                    onChange={(e) => setSearchEmployee(e.target.value)}
                    onFocus={() => setShowEmployeeSearch(true)}
                    className="search-input"
                  />
                </div>
                {showEmployeeSearch && (
                  <div className="search-results">
                    {filteredEmployees.map(employee => (
                      <div 
                        key={employee.id} 
                        className="search-result-item"
                        onClick={() => handleEmployeeSelect(employee)}
                      >
                        <div className="result-info">
                          <div className="result-name">{employee.name}</div>
                          <div className="result-details">{employee.position} • {employee.department}</div>
                          <div className="result-email">{employee.email}</div>
                        </div>
                        <FiPlus className="add-icon" />
                      </div>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <div className="no-results">No employees found</div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="selected-list">
                <h4>Selected Employees ({selectedEmployees.length})</h4>
                {selectedEmployees.length === 0 ? (
                  <div className="empty-state">
                    <FiUsers className="empty-icon" />
                    <p>No employees selected</p>
                    <span>Search and select employees above</span>
                  </div>
                ) : (
                  <div className="selected-items">
                    {selectedEmployees.map(employee => (
                      <div key={employee.id} className="selected-item">
                        <div className="item-info">
                          <div className="item-name">{employee.name}</div>
                          <div className="item-details">{employee.position} • {employee.department}</div>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveEmployee(employee.id)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manager Selection */}
          <div className="assignment-card">
            <div className="card-header">
              <h3>
                <FiUserCheck />
                Select Managers (Optional)
              </h3>
              <span className="optional-badge">Optional</span>
            </div>
            <div className="card-content">
              <div className="search-section">
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search managers by name, department, or position..."
                    value={searchManager}
                    onChange={(e) => setSearchManager(e.target.value)}
                    onFocus={() => setShowManagerSearch(true)}
                    className="search-input"
                  />
                </div>
                {showManagerSearch && (
                  <div className="search-results">
                    {filteredManagers.map(manager => (
                      <div 
                        key={manager.id} 
                        className="search-result-item"
                        onClick={() => handleManagerSelect(manager)}
                      >
                        <div className="result-info">
                          <div className="result-name">{manager.name}</div>
                          <div className="result-details">{manager.position} • {manager.department}</div>
                          <div className="result-email">{manager.email}</div>
                        </div>
                        <FiPlus className="add-icon" />
                      </div>
                    ))}
                    {filteredManagers.length === 0 && (
                      <div className="no-results">No managers found</div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="selected-list">
                <h4>Selected Managers ({selectedManagers.length})</h4>
                {selectedManagers.length === 0 ? (
                  <div className="empty-state">
                    <FiUserCheck className="empty-icon" />
                    <p>No managers selected</p>
                    <span>Managers can provide additional feedback</span>
                  </div>
                ) : (
                  <div className="selected-items">
                    {selectedManagers.map(manager => (
                      <div key={manager.id} className="selected-item">
                        <div className="item-info">
                          <div className="item-name">{manager.name}</div>
                          <div className="item-details">{manager.position} • {manager.department}</div>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveManager(manager.id)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deadline Setting */}
          <div className="assignment-card deadline-card">
            <div className="card-header">
              <h3>
                <FiCalendar />
                Set Deadline
              </h3>
              <span className="required-badge">Required</span>
            </div>
            <div className="card-content">
              <div className="deadline-section">
                <div className="deadline-input-wrapper">
                  <FiClock className="clock-icon" />
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="deadline-input"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="deadline-info">
                  <p><strong>Deadline:</strong> {deadline ? new Date(deadline).toLocaleString() : 'Not set'}</p>
                  <p className="deadline-note">
                    Employees will receive notifications about this deadline. 
                    The form will be automatically closed after the deadline passes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Summary */}
        <div className="assignment-summary">
          <h3>Assignment Summary</h3>
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Form:</span>
              <span className="summary-value">{form.title}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Employees:</span>
              <span className="summary-value">{selectedEmployees.length} selected</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Managers:</span>
              <span className="summary-value">{selectedManagers.length} selected</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Deadline:</span>
              <span className="summary-value">
                {deadline ? new Date(deadline).toLocaleString() : 'Not set'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAssignment;



