import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiBriefcase, 
  FiUsers, 
  FiSave, 
  FiX,
  FiArrowLeft
} from 'react-icons/fi';
import ApiService from '../../services/api';
import './CreateUser.css';

const CreateUser = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // Section 1: Personal Details
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    personalEmail: '',
    address: '',
    emergencyContact: '',
    // Section 2: Work Information
    employeeId: '',
    hireDate: '',
    department: '',
    position: '',
    workLocation: '',
    managerId: '',
    employmentType: '',
    probationMonths: '',
    // Section 3: Identity & Statutory
    pan: '',
    aadhaar: '',
    uan: '',
    passportNumber: '',
    passportExpiry: '',
    highestQualification: '',
    // Section 4: Bank Details
    bankAccount: '',
    bankName: '',
    ifsc: '',
    // Section 5: System Access & Status
    systemRole: '',
    active: false,
    // Compatibility legacy fields
    email: '',
    role: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [managers, setManagers] = useState([]);
  const [isLoadingManagers, setIsLoadingManagers] = useState(false);

  const roles = [
    { value: 'CEO', label: 'CEO' },
    { value: 'Manager', label: 'Manager' },
    { value: 'HR', label: 'HR' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Intern', label: 'Intern' }
  ];

  const departments = [
    { value: 'Management', label: 'Management' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Development', label: 'Development' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' }
  ];

  const genders = ['Male', 'Female', 'Other'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const locations = ['Bangalore', 'Mumbai', 'Hyderabad', 'Remote'];
  const employmentTypes = ['Permanent', 'Contract', 'Intern'];
  const systemRoles = ['Employee', 'Manager', 'HR', 'Admin'];

  // Fetch managers from API
  React.useEffect(() => {
    const fetchManagers = async () => {
      setIsLoadingManagers(true);
      try {
        const employees = await ApiService.getEmployees();
        // Filter employees who can be managers (CEO, Manager, HR roles)
        const managerRoles = ['CEO', 'Manager', 'HR'];
        const managerList = employees
          .filter(emp => managerRoles.includes(emp.role) && emp.active)
          .map(emp => ({
            id: emp.id,
            name: emp.name,
            role: emp.role
          }));
        setManagers(managerList);
      } catch (err) {
        console.error('Error fetching managers:', err);
        // Fallback to empty array if API fails
        setManagers([]);
      } finally {
        setIsLoadingManagers(false);
      }
    };

    fetchManagers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.personalEmail.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.gender) {
      setError('Gender is required');
      return false;
    }
    if (!formData.bloodGroup) {
      setError('Blood Group is required');
      return false;
    }
    if (!formData.department) {
      setError('Department is required');
      return false;
    }
    if (!formData.position.trim()) {
      setError('Position is required');
      return false;
    }
    if (!formData.hireDate) {
      setError('Hire date is required');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.employeeId.trim()) {
      setError('Employee ID is required');
      return false;
    }
    if (!formData.systemRole) {
      setError('System Access Role is required');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personalEmail)) {
      setError('Please enter a valid email address');
      return false;
    }

    // PAN validation (e.g., ABCDE1234F)
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan.toUpperCase())) {
      setError('Invalid PAN format');
      return false;
    }
    // Aadhaar validation (12 digits)
    if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar)) {
      setError('Aadhaar must be 12 digits');
      return false;
    }
    // IFSC validation (e.g., HDFC0001234)
    if (formData.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.ifsc)) {
      setError('Invalid IFSC code');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the data for API call
      const userData = {
        // Personal
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        phoneNumber: formData.phoneNumber,
        personalEmail: formData.personalEmail,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        // Work
        employeeId: formData.employeeId,
        hireDate: formData.hireDate,
        department: formData.department,
        position: formData.position,
        workLocation: formData.workLocation,
        managerId: formData.managerId ? parseInt(formData.managerId) : null,
        employmentType: formData.employmentType,
        probationMonths: formData.probationMonths ? parseInt(formData.probationMonths) : null,
        // Identity
        pan: formData.pan.toUpperCase(),
        aadhaar: formData.aadhaar,
        uan: formData.uan,
        passportNumber: formData.passportNumber,
        passportExpiry: formData.passportExpiry,
        highestQualification: formData.highestQualification,
        // Bank
        bankAccount: formData.bankAccount,
        bankName: formData.bankName,
        ifsc: formData.ifsc.toUpperCase(),
        // System
        systemRole: formData.systemRole,
        active: formData.active
      };

      // Call the API to create the employee
      const createdEmployee = await ApiService.createEmployee(userData);
      
      console.log('User created successfully:', createdEmployee);
      setSuccess('User created successfully!');
      
      // Reset form after successful creation
      setTimeout(() => {
        setFormData({
          name: '',
          dateOfBirth: '',
          gender: '',
          bloodGroup: '',
          phoneNumber: '',
          personalEmail: '',
          address: '',
          emergencyContact: '',
          employeeId: '',
          hireDate: '',
          department: '',
          position: '',
          workLocation: '',
          managerId: '',
          employmentType: '',
          probationMonths: '',
          pan: '',
          aadhaar: '',
          uan: '',
          passportNumber: '',
          passportExpiry: '',
          highestQualification: '',
          bankAccount: '',
          bankName: '',
          ifsc: '',
          systemRole: '',
          active: false,
          email: '',
          role: ''
        });
        setSuccess('');
      }, 2000);

    } catch (err) {
      console.error('Error creating user:', err);
      if (err.message.includes('409') || err.message.includes('duplicate')) {
        setError('A user with this email already exists. Please use a different email address.');
      } else if (err.message.includes('400')) {
        setError('Invalid data provided. Please check all fields and try again.');
      } else {
        setError('Failed to create user. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="create-user-container">
      {/* Header */}
      <div className="create-user-header">
        <button className="back-button" onClick={handleCancel}>
          <FiArrowLeft />
          Back to Dashboard
        </button>
        <h1>Create New User</h1>
      </div>

      {/* Form */}
      <div className="create-user-form-container">
        <form onSubmit={handleSubmit} className="create-user-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FiUser className="section-icon" />
              Personal Information
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Full Name *
                </label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="personalEmail">
                  Personal Email Address *
                </label>
                <div className="input-with-icon">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="personalEmail"
                    name="personalEmail"
                    value={formData.personalEmail}
                    onChange={handleInputChange}
                    placeholder="Enter personal email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Phone Number *
                </label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gender</option>
                  {genders.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Work Information Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FiBriefcase className="section-icon" />
              Work Information
            </h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID *</label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter employee ID"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">
                  Department *
                </label>
                <div className="input-with-icon">
                  <FiBriefcase className="input-icon" />
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">
                  Position *
                </label>
                <div className="input-with-icon">
                  <FiBriefcase className="input-icon" />
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter job position"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hireDate">
                  Hire Date *
                </label>
                <div className="input-with-icon">
                  <FiCalendar className="input-icon" />
                  <input
                    type="date"
                    id="hireDate"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workLocation">Work Location / Branch *</label>
                <select
                  id="workLocation"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="managerId">
                  Manager (Optional)
                </label>
                <div className="input-with-icon">
                  <FiUsers className="input-icon" />
                  <select
                    id="managerId"
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleInputChange}
                    disabled={isLoadingManagers}
                  >
                    <option value="">
                      {isLoadingManagers ? 'Loading managers...' : 'Select a manager'}
                    </option>
                    {managers.map(manager => (
                      <option key={manager.id} value={manager.id}>
                        {manager.name} ({manager.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employmentType">Employment Type *</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  {employmentTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="probationMonths">Probation Period (months)</label>
                <input
                  type="number"
                  id="probationMonths"
                  name="probationMonths"
                  value={formData.probationMonths}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 3"
                />
              </div>
            </div>
          </div>

          {/* Identity & Statutory Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FiUser className="section-icon" />
              Identity & Statutory Details
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pan">PAN *</label>
                <input
                  type="text"
                  id="pan"
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  placeholder="ABCDE1234F"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="aadhaar">Aadhaar *</label>
                <input
                  type="text"
                  id="aadhaar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  placeholder="12 digit number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="uan">UAN</label>
                <input
                  type="text"
                  id="uan"
                  name="uan"
                  value={formData.uan}
                  onChange={handleInputChange}
                  placeholder="Universal Account Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="highestQualification">Highest Qualification</label>
                <input
                  type="text"
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleInputChange}
                  placeholder="e.g., B.E. Computer Science"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="passportNumber">Passport Number</label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  placeholder="Passport number (optional)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passportExpiry">Passport Expiry Date</label>
                <input
                  type="date"
                  id="passportExpiry"
                  name="passportExpiry"
                  value={formData.passportExpiry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FiBriefcase className="section-icon" />
              Bank Details (Payroll)
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bankAccount">Bank Account Number *</label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bankName">Bank Name *</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ifsc">IFSC Code *</label>
                <input
                  type="text"
                  id="ifsc"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  placeholder="e.g., HDFC0001234"
                  required
                />
              </div>
            </div>
          </div>

          {/* System Access & Status */}
          <div className="form-section">
            <h3 className="section-title">
              <FiUsers className="section-icon" />
              System Access & Status
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="systemRole">System Access Role *</label>
                <select
                  id="systemRole"
                  name="systemRole"
                  value={formData.systemRole}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select role</option>
                  {systemRoles.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label>Active Employee</label>
                <label className="checkbox-label" aria-label="Active Employee">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="error-message">
              <FiX className="error-icon" />
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <FiSave className="success-icon" />
              {success}
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <FiX />
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating...
                </>
              ) : (
                <>
                  <FiSave />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
