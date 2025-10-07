import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMoreVertical, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import './Members.css';

const Members = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedMember, setEditedMember] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberPendingDelete, setMemberPendingDelete] = useState(null);

  // Option lists to align with Create User form
  const genders = ['Male', 'Female', 'Other'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const employmentTypes = ['Permanent', 'Contract', 'Intern'];
  const systemRoles = ['Employee', 'Manager', 'HR', 'Admin'];
  const locations = ['Bangalore', 'Mumbai', 'Hyderabad', 'Remote'];

  // Demo data based on the provided Sumeru Digital team
  const demoMembers = [
    {
      id: 1,
      name: 'Abhijeet',
      email: 'ceo@sumerudigital.com',
      role: 'CEO',
      department: 'Executive',
      position: 'Chief Executive Officer',
      hireDate: '2020-01-01',
      phoneNumber: '+91 98765 43210',
      address: 'Bangalore, India',
      active: true,
      manager: null
    },
    {
      id: 2,
      name: 'Kiran',
      email: 'hr@sumerudigital.com',
      role: 'HR',
      department: 'Human Resources',
      position: 'HR Manager',
      hireDate: '2021-03-15',
      phoneNumber: '+91 98765 43211',
      address: 'Bangalore, India',
      active: true,
      manager: 'Abhijeet'
    },
    {
      id: 3,
      name: 'Niharika',
      email: 'pm@sumerudigital.com',
      role: 'PM',
      department: 'Product Management',
      position: 'Product Manager',
      hireDate: '2021-06-01',
      phoneNumber: '+91 98765 43212',
      address: 'Bangalore, India',
      active: true,
      manager: 'Abhijeet'
    },
    {
      id: 4,
      name: 'Tushar',
      email: 'tushar@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-01-10',
      phoneNumber: '+91 98765 43213',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 5,
      name: 'Venkat',
      email: 'venkat@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-02-15',
      phoneNumber: '+91 98765 43214',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 6,
      name: 'Avinash',
      email: 'avinash@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-03-20',
      phoneNumber: '+91 98765 43215',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 7,
      name: 'Bharath',
      email: 'bharath@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-04-01',
      phoneNumber: '+91 98765 43216',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 8,
      name: 'Kaveri',
      email: 'kaveri@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-05-10',
      phoneNumber: '+91 98765 43217',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 9,
      name: 'Shreya',
      email: 'shreya@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-06-15',
      phoneNumber: '+91 98765 43218',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 10,
      name: 'Surbhi',
      email: 'surbhi@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-07-01',
      phoneNumber: '+91 98765 43219',
      address: 'Bangalore, India',
      active: true,
      manager: 'Niharika'
    },
    {
      id: 11,
      name: 'Nivetha',
      email: 'nivetha@sumerudigital.com',
      role: 'PM',
      department: 'Product Management',
      position: 'Product Manager',
      hireDate: '2022-08-01',
      phoneNumber: '+91 98765 43220',
      address: 'Bangalore, India',
      active: true,
      manager: 'Abhijeet'
    },
    {
      id: 12,
      name: 'Saurav',
      email: 'saurav@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-09-01',
      phoneNumber: '+91 98765 43221',
      address: 'Bangalore, India',
      active: true,
      manager: 'Nivetha'
    },
    {
      id: 13,
      name: 'Chinmay',
      email: 'chinmay@sumerudigital.com',
      role: 'Web Developer',
      department: 'Engineering',
      position: 'Web Developer',
      hireDate: '2022-10-01',
      phoneNumber: '+91 98765 43222',
      address: 'Bangalore, India',
      active: true,
      manager: 'Nivetha'
    }
  ];

  useEffect(() => {
    setMembers(demoMembers);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    if (!role) return 'role-employee';
    switch (role.toLowerCase()) {
      case 'ceo':
        return 'role-ceo';
      case 'hr':
        return 'role-hr';
      case 'pm':
        return 'role-pm';
      case 'manager':
        return 'role-pm';
      case 'admin':
        return 'role-hr';
      case 'employee':
        return 'role-employee';
      case 'web developer':
        return 'role-developer';
      default:
        return 'role-employee';
    }
  };

  const handleEdit = (memberId) => {
    const member = members.find(m => m.id === memberId);
    setEditedMember({ ...member });
    setIsEditMode(true);
  };

  const handleDelete = (memberId) => {
    const member = members.find(m => m.id === memberId);
    setMemberPendingDelete(member);
    setDeleteModalOpen(true);
  };

  const confirmMemberDelete = () => {
    if (memberPendingDelete) {
      setMembers(prev => prev.filter(m => m.id !== memberPendingDelete.id));
      if (selectedMember && selectedMember.id === memberPendingDelete.id) {
        setShowMemberModal(false);
      }
    }
    setDeleteModalOpen(false);
    setMemberPendingDelete(null);
  };

  const cancelMemberDelete = () => {
    setDeleteModalOpen(false);
    setMemberPendingDelete(null);
  };

  const handleView = (memberId) => {
    const member = members.find(m => m.id === memberId);
    setSelectedMember(member);
    setShowMemberModal(true);
    setIsEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setEditedMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    setMembers(prev => prev.map(member => 
      member.id === editedMember.id ? editedMember : member
    ));
    setSelectedMember(editedMember);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedMember(null);
  };

  return (
    <div className="members-container">
      <div className="members-header">
        <div className="header-left">
          <h1>Members</h1>
          <p>Manage your team members and their information</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            Add Member
          </button>
        </div>
      </div>

      <div className="members-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown">
          <FiFilter className="filter-icon" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="ceo">CEO</option>
            <option value="hr">HR</option>
            <option value="pm">PM</option>
            <option value="web developer">Web Developer</option>
          </select>
        </div>
      </div>

      <div className="members-table-container members-list-container">
        <div className="members-list-header minimal">
          <div className="header-item">Name</div>
          <div className="header-item">Email</div>
          <div className="header-item">Role</div>
          <div className="header-item">View</div>
        </div>
        <div className="members-list-body">
            {filteredMembers.map((member) => (
            <div key={member.id} className="member-row minimal">
              <div className="member-cell member-name">
                    <div className="member-avatar">
                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="member-details">
                  <div className="member-name-text">{member.name}</div>
                      <div className="member-phone">{member.phoneNumber}</div>
                    </div>
                  </div>
              <div className="member-cell cell-ellipsis">{member.personalEmail || member.email}</div>
              <div className="member-cell cell-center">
                <span className={`role-badge ${getRoleColor(member.systemRole || member.role)}`}>{member.systemRole || member.role}</span>
              </div>
              <div className="member-cell cell-center">
                  <div className="action-buttons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(member.id)}
                      title="View"
                    >
                      <FiEye size={12} />
                    </button>
                  </div>
              </div>
            </div>
            ))}
        </div>
      </div>

      {filteredMembers.length === 0 && (
        <div className="no-results">
          <p>No members found matching your criteria.</p>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="member-modal-overlay">
          <div className="member-modal">
            <div className="member-modal-header">
              <h2>Member Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowMemberModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="member-modal-content">
              <div className="member-info-section">
                <div className="member-avatar-large">
                  {(isEditMode ? editedMember : selectedMember).name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="member-details-large">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="edit-input name-input"
                    />
                  ) : (
                    <h3>{selectedMember.name}</h3>
                  )}
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="edit-input position-input"
                      placeholder="Position"
                    />
                  ) : (
                    <p className="member-position">{selectedMember.position}</p>
                  )}
                  {isEditMode ? (
                    <select
                      value={editedMember.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="edit-select role-select"
                    >
                      <option value="CEO">CEO</option>
                      <option value="HR">HR</option>
                      <option value="PM">PM</option>
                      <option value="Web Developer">Web Developer</option>
                    </select>
                  ) : (
                    <span className={`role-badge ${getRoleColor(selectedMember.role)}`}>
                      {selectedMember.role}
                    </span>
                  )}
                </div>
              </div>

              <div className="member-details-grid">
                <div className="detail-item">
                  <label>Email:</label>
                  {isEditMode ? (
                    <input
                      type="email"
                      value={editedMember.personalEmail || editedMember.email || ''}
                      onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                      className="edit-input"
                      placeholder="name@example.com"
                    />
                  ) : (
                    <span>{selectedMember.personalEmail || selectedMember.email || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Department:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.department || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={editedMember.phoneNumber || ''}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="edit-input"
                      placeholder="+91 ..."
                    />
                  ) : (
                    <span>{selectedMember.phoneNumber || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Address:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.address || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Hire Date:</label>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={editedMember.hireDate || ''}
                      onChange={(e) => handleInputChange('hireDate', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.hireDate ? new Date(selectedMember.hireDate).toLocaleDateString() : '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Employee ID:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.employeeId || ''}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.employeeId || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Work Location:</label>
                  {isEditMode ? (
                    <select
                      value={editedMember.workLocation || ''}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{selectedMember.workLocation || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Employment Type:</label>
                  {isEditMode ? (
                    <select
                      value={editedMember.employmentType || ''}
                      onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select type</option>
                      {employmentTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{selectedMember.employmentType || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Probation (months):</label>
                  {isEditMode ? (
                    <input
                      type="number"
                      value={editedMember.probationMonths || ''}
                      onChange={(e) => handleInputChange('probationMonths', e.target.value)}
                      className="edit-input"
                      min="0"
                    />
                  ) : (
                    <span>{selectedMember.probationMonths || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Gender:</label>
                  {isEditMode ? (
                    <select
                      value={editedMember.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select gender</option>
                      {genders.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{selectedMember.gender || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Blood Group:</label>
                  {isEditMode ? (
                    <select
                      value={editedMember.bloodGroup || ''}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select group</option>
                      {bloodGroups.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{selectedMember.bloodGroup || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Date of Birth:</label>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={editedMember.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.dateOfBirth ? new Date(selectedMember.dateOfBirth).toLocaleDateString() : '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>PAN:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.pan || ''}
                      onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                      className="edit-input"
                      placeholder="ABCDE1234F"
                    />
                  ) : (
                    <span>{selectedMember.pan || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Aadhaar:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.aadhaar || ''}
                      onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                      className="edit-input"
                      placeholder="12 digits"
                    />
                  ) : (
                    <span>{selectedMember.aadhaar || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>UAN:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.uan || ''}
                      onChange={(e) => handleInputChange('uan', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.uan || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Passport No.:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.passportNumber || ''}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.passportNumber || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Passport Expiry:</label>
                  {isEditMode ? (
                    <input
                      type="date"
                      value={editedMember.passportExpiry || ''}
                      onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.passportExpiry ? new Date(selectedMember.passportExpiry).toLocaleDateString() : '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Highest Qualification:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.highestQualification || ''}
                      onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.highestQualification || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Bank Account:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.bankAccount || ''}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.bankAccount || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Bank Name:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.bankName || ''}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <span>{selectedMember.bankName || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>IFSC:</label>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedMember.ifsc || ''}
                      onChange={(e) => handleInputChange('ifsc', e.target.value.toUpperCase())}
                      className="edit-input"
                      placeholder="HDFC0001234"
                    />
                  ) : (
                    <span>{selectedMember.ifsc || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>System Role:</label>
                  {isEditMode ? (
                    <select
                      value={editedMember.systemRole || editedMember.role || ''}
                      onChange={(e) => handleInputChange('systemRole', e.target.value)}
                      className="edit-select"
                    >
                      <option value="">Select role</option>
                      {systemRoles.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  ) : (
                    <span>{selectedMember.systemRole || selectedMember.role || '—'}</span>
                  )}
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  {isEditMode ? (
                    <select
                      value={(editedMember.active ? 'active' : 'inactive')}
                      onChange={(e) => handleInputChange('active', e.target.value === 'active')}
                      className="edit-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span className={`status-badge ${selectedMember.active ? 'active' : 'inactive'}`}>
                      {selectedMember.active ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="member-modal-actions">
              {isEditMode ? (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-success"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowMemberModal(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="btn-warning"
                    onClick={() => handleEdit(selectedMember.id)}
                  >
                    <FiEdit size={14} />
                    Edit Member
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleDelete(selectedMember.id)}
                  >
                    <FiTrash2 size={14} />
                    Delete Member
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {deleteModalOpen && memberPendingDelete && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-modal">
            <div className="confirm-header">
              <h3>⚠️ Confirm Deletion</h3>
            </div>
            <div className="confirm-body">
              <p>
                Are you sure you want to permanently delete the member <strong>{memberPendingDelete.name}</strong>?
              </p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={cancelMemberDelete}>Cancel</button>
              <button className="btn-danger" onClick={confirmMemberDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;