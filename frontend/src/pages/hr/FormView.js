import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiEdit, 
  FiCopy, 
  FiDownload, 
  FiShare2, 
  FiEye,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiBarChart2
} from 'react-icons/fi';
import './FormView.css';

const FormView = ({ formId, onBack, onEdit }) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample form data - in real app, this would come from API
  const sampleForms = {
    1: {
      id: 1,
      title: 'Annual Performance Review',
      description: 'Comprehensive annual performance evaluation form for all employees',
      category: 'Performance',
      questions: [
        {
          id: 1,
          type: 'rating',
          question: 'How would you rate your overall job performance this year?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: true
        },
        {
          id: 2,
          type: 'text',
          question: 'What are your key achievements this year?',
          required: true
        },
        {
          id: 3,
          type: 'multiple-choice',
          question: 'Which areas do you feel you need improvement in?',
          options: ['Communication', 'Technical Skills', 'Leadership', 'Time Management', 'Teamwork'],
          required: false
        },
        {
          id: 4,
          type: 'rating',
          question: 'How satisfied are you with your current role?',
          options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
          required: true
        },
        {
          id: 5,
          type: 'text',
          question: 'What are your career goals for the next year?',
          required: false
        }
      ],
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'Active',
      responses: 45,
      author: 'HR Team',
      totalQuestions: 5,
      averageCompletionTime: '15 minutes',
      responseRate: '92%'
    },
    2: {
      id: 2,
      title: '360-Degree Feedback Form',
      description: 'Multi-source feedback form for comprehensive employee evaluation',
      category: 'Feedback',
      questions: [
        {
          id: 1,
          type: 'rating',
          question: 'How would you rate this person\'s communication skills?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: true
        },
        {
          id: 2,
          type: 'rating',
          question: 'How would you rate their teamwork abilities?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: true
        },
        {
          id: 3,
          type: 'text',
          question: 'What are this person\'s key strengths?',
          required: true
        },
        {
          id: 4,
          type: 'text',
          question: 'What areas could this person improve in?',
          required: false
        }
      ],
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'Active',
      responses: 32,
      author: 'HR Team',
      totalQuestions: 4,
      averageCompletionTime: '12 minutes',
      responseRate: '88%'
    }
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setForm(sampleForms[formId] || sampleForms[1]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formId]);

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'rating': return <FiBarChart2 />;
      case 'text': return <FiFileText />;
      case 'multiple-choice': return <FiUsers />;
      default: return <FiFileText />;
    }
  };

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case 'rating': return 'Rating Scale';
      case 'text': return 'Text Input';
      case 'multiple-choice': return 'Multiple Choice';
      default: return 'Question';
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(formId);
    }
  };

  const handleCopy = () => {
    console.log('Copy form:', formId);
    // TODO: Implement copy functionality
  };

  const handleShare = () => {
    console.log('Share form:', formId);
    // TODO: Implement share functionality
  };

  const handleDownload = () => {
    if (!form) return;
    const headers = ['Question #','Type','Question','Option Label','Points'];
    const rows = [];
    form.questions.forEach((q, idx) => {
      if (q.options && q.options.length > 0) {
        q.options.forEach((opt, oi) => {
          const optObj = typeof opt === 'string' ? { label: opt, points: (q.options.length === 5 ? oi + 1 : 1) } : opt;
          rows.push([idx + 1, q.type, q.question, optObj.label, optObj.points]);
        });
      } else {
        rows.push([idx + 1, q.type, q.question, '', '']);
      }
    });

    const csv = [headers.join(',')].concat(rows.map(r => r.map(cell => {
      const s = String(cell ?? '');
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    }).join(','))).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${form.title || 'form'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="form-view-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading form details...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="form-view-container">
        <div className="error-state">
          <h2>Form Not Found</h2>
          <p>The requested form could not be found.</p>
          <button className="btn-primary" onClick={onBack}>
            <FiArrowLeft />
            Back to Forms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-view-container">
      {/* Header */}
      <div className="form-view-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <FiArrowLeft />
            Back to Forms
          </button>
          <div className="form-title-section">
            <h1>{form.title}</h1>
            <div className="form-meta-header">
              <span className={`category-badge category-${form.category.toLowerCase()}`}>
                {form.category}
              </span>
              <span className={`status-badge status-${form.status.toLowerCase()}`}>
                {form.status}
              </span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleCopy}>
            <FiCopy />
            Copy
          </button>
          <button className="btn-secondary" onClick={handleShare}>
            <FiShare2 />
            Share
          </button>
          <button className="btn-secondary" onClick={handleDownload}>
            <FiDownload />
            Export
          </button>
          <button className="btn-primary" onClick={handleEdit}>
            <FiEdit />
            Edit Form
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="form-view-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FiEye />
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <FiFileText />
          Questions ({form.totalQuestions})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'responses' ? 'active' : ''}`}
          onClick={() => setActiveTab('responses')}
        >
          <FiBarChart2 />
          Responses ({form.responses})
        </button>
      </div>

      {/* Content */}
      <div className="form-view-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Form Details</h3>
                <div className="detail-item">
                  <span className="detail-label">Description:</span>
                  <p className="detail-value">{form.description}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Author:</span>
                  <span className="detail-value">{form.author}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{new Date(form.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Modified:</span>
                  <span className="detail-value">{new Date(form.lastModified).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="overview-card">
                <h3>Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiFileText />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{form.totalQuestions}</span>
                      <span className="stat-label">Questions</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiUsers />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{form.responses}</span>
                      <span className="stat-label">Responses</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiCalendar />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{form.averageCompletionTime}</span>
                      <span className="stat-label">Avg. Time</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FiBarChart2 />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{form.responseRate}</span>
                      <span className="stat-label">Response Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="questions-tab">
            <div className="questions-header">
              <h3>Form Questions</h3>
              <p>Review all questions in this form</p>
            </div>
            <div className="questions-list">
              {form.questions.map((question, index) => (
                <div key={question.id} className="question-card">
                  <div className="question-header">
                    <div className="question-number">Q{index + 1}</div>
                    <div className="question-type">
                      {getQuestionTypeIcon(question.type)}
                      <span>{getQuestionTypeLabel(question.type)}</span>
                    </div>
                    {question.required && (
                      <span className="required-badge">Required</span>
                    )}
                  </div>
                  <div className="question-content">
                    <h4>{question.question}</h4>
                    {question.options && (
                      <div className="question-options">
                        {question.options.map((option, optIndex) => {
                          const optObj = typeof option === 'string' ? { label: option, points: (question.options.length === 5 ? optIndex + 1 : 1) } : option;
                          return (
                            <div key={optIndex} className="option-item">
                              <span className="option-number">{optIndex + 1}</span>
                              <span className="option-text">{optObj.label}</span>
                              {typeof optObj.points !== 'undefined' && (
                                <span className="option-points">({optObj.points})</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'responses' && (
          <div className="responses-tab">
            <div className="responses-header">
              <h3>Form Responses</h3>
              <p>View and analyze responses to this form</p>
            </div>
            <div className="responses-placeholder">
              <div className="placeholder-content">
                <FiBarChart2 className="placeholder-icon" />
                <h4>Response Analytics</h4>
                <p>Response analytics and charts will be displayed here.</p>
                <p>This feature will show response trends, completion rates, and detailed analytics.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormView;
