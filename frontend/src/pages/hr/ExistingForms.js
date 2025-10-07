import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye, FiMoreVertical, FiArrowUp, FiArrowDown, FiSend } from 'react-icons/fi';
import './ExistingForms.css';

const ExistingForms = ({ onCreate, onEdit, onView, onAssign }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentView, setCurrentView] = useState('list'); // deprecated navigation state, retained for minimal diff
  const [selectedFormId, setSelectedFormId] = useState(null);

  // Sample appraisal questionnaire forms
  const initialForms = [
    {
      id: 1,
      title: 'Annual Performance Review',
      description: 'Comprehensive annual performance evaluation form for all employees',
      category: 'Performance',
      questions: 15,
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'Active',
      responses: 45,
      author: 'HR Team'
    },
    {
      id: 2,
      title: '360-Degree Feedback Form',
      description: 'Multi-source feedback form for comprehensive employee evaluation',
      category: 'Feedback',
      questions: 12,
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'Active',
      responses: 32,
      author: 'HR Team'
    },
    {
      id: 3,
      title: 'Manager Self-Assessment',
      description: 'Self-evaluation form for managers to assess their leadership skills',
      category: 'Leadership',
      questions: 18,
      createdDate: '2024-01-05',
      lastModified: '2024-01-15',
      status: 'Active',
      responses: 28,
      author: 'HR Team'
    },
    {
      id: 4,
      title: 'Team Collaboration Assessment',
      description: 'Form to evaluate team collaboration and communication skills',
      category: 'Teamwork',
      questions: 10,
      createdDate: '2023-12-20',
      lastModified: '2024-01-12',
      status: 'Active',
      responses: 67,
      author: 'HR Team'
    },
    {
      id: 5,
      title: 'Goal Setting Review',
      description: 'Quarterly goal setting and achievement review form',
      category: 'Goals',
      questions: 8,
      createdDate: '2023-12-15',
      lastModified: '2024-01-08',
      status: 'Draft',
      responses: 0,
      author: 'HR Team'
    },
    {
      id: 6,
      title: 'Skills Development Assessment',
      description: 'Form to assess employee skills and development needs',
      category: 'Development',
      questions: 14,
      createdDate: '2023-12-10',
      lastModified: '2023-12-28',
      status: 'Active',
      responses: 89,
      author: 'HR Team'
    }
  ];

  const [forms, setForms] = useState(initialForms);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formPendingDelete, setFormPendingDelete] = useState(null);

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || form.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'draft':
        return 'status-draft';
      case 'archived':
        return 'status-archived';
      default:
        return 'status-default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'performance':
        return 'category-performance';
      case 'feedback':
        return 'category-feedback';
      case 'leadership':
        return 'category-leadership';
      case 'teamwork':
        return 'category-teamwork';
      case 'goals':
        return 'category-goals';
      case 'development':
        return 'category-development';
      default:
        return 'category-default';
    }
  };

  const handleCreateNewForm = () => {
    if (onCreate) onCreate();
  };

  const handleCopy = (formId) => {
    console.log('Copy form:', formId);
    // TODO: Implement copy functionality
  };

  const handleDelete = (form) => {
    setFormPendingDelete(form);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (formPendingDelete) {
      setForms(prev => prev.filter(f => f.id !== formPendingDelete.id));
    }
    setDeleteModalOpen(false);
    setFormPendingDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setFormPendingDelete(null);
  };

  const toggleMenu = (formId) => {
    setOpenMenuId(prev => (prev === formId ? null : formId));
  };

  const moveForm = (formId, direction) => {
    setForms(prev => {
      const updated = [...prev];
      const index = updated.findIndex(f => f.id === formId);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  return (
    <div className="existing-forms-container">
      <div className="forms-header">
        <div className="header-left">
          <h1>Existing Forms</h1>
          <p>Manage and view all your appraisal questionnaire forms</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleCreateNewForm}>
            Create New Form
          </button>
        </div>
      </div>

      <div className="forms-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown">
          <FiFilter className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="performance">Performance</option>
            <option value="feedback">Feedback</option>
            <option value="leadership">Leadership</option>
            <option value="teamwork">Teamwork</option>
            <option value="goals">Goals</option>
            <option value="development">Development</option>
          </select>
        </div>
      </div>

      <div className="forms-grid">
        {filteredForms.map((form) => (
          <div key={form.id} className="form-card">
            <div className="form-card-header">
              <div className="form-title-section">
                <h3>{form.title}</h3>
                <span className={`category-badge ${getCategoryColor(form.category)}`}>
                  {form.category}
                </span>
              </div>
              <div className="form-actions">
                <button
                  className="more-btn"
                  onClick={() => moveForm(form.id, 'up')}
                  disabled={forms.findIndex(f => f.id === form.id) === 0}
                  title="Move Up"
                  aria-label="Move Up"
                >
                  <FiArrowUp size={16} />
                </button>
                <button
                  className="more-btn"
                  onClick={() => moveForm(form.id, 'down')}
                  disabled={forms.findIndex(f => f.id === form.id) === forms.length - 1}
                  title="Move Down"
                  aria-label="Move Down"
                >
                  <FiArrowDown size={16} />
                </button>
                <button
                  className="more-btn"
                  onClick={() => handleDelete(form)}
                  title="Delete"
                  aria-label="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
                <button
                  className="more-btn"
                  onClick={() => toggleMenu(form.id)}
                  aria-haspopup="true"
                  aria-expanded={openMenuId === form.id}
                  title="Actions"
                >
                  <FiMoreVertical size={18} />
                </button>
                {openMenuId === form.id && (
                  <div className="actions-menu" role="menu">
                    <button role="menuitem" className="menu-item" onClick={() => { onView && onView(form.id); setOpenMenuId(null); }}>
                      <FiEye size={14} />
                      <span>View</span>
                    </button>
                    <button role="menuitem" className="menu-item" onClick={() => { onEdit && onEdit(form.id); setOpenMenuId(null); }}>
                      <FiEdit size={14} />
                      <span>Edit</span>
                    </button>
                    <button role="menuitem" className="menu-item" onClick={() => { onAssign && onAssign(form.id, form.title); setOpenMenuId(null); }}>
                      <FiSend size={14} />
                      <span>Assign</span>
                    </button>
                    <button role="menuitem" className="menu-item danger" onClick={() => { handleDelete(form); setOpenMenuId(null); }}>
                      <FiTrash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-card-content">
              <p className="form-description">{form.description}</p>
              
              <div className="form-stats">
                <div className="stat-item">
                  <span className="stat-label">Questions:</span>
                  <span className="stat-value">{form.questions}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Responses:</span>
                  <span className="stat-value">{form.responses}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Author:</span>
                  <span className="stat-value">{form.author}</span>
                </div>
              </div>

              <div className="form-meta">
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{new Date(form.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Modified:</span>
                  <span className="meta-value">{new Date(form.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Status:</span>
                  <span className={`status-badge ${getStatusColor(form.status)}`}>
                    {form.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="no-results">
          <p>No forms found matching your criteria.</p>
        </div>
      )}

      {deleteModalOpen && formPendingDelete && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h3>⚠️ Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to permanently delete the form <strong>'{formPendingDelete.title}'</strong>?
              </p>
              <p>
                This will also delete all <strong>{formPendingDelete.responses}</strong> associated responses. This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>Cancel</button>
              <button className="btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingForms;
