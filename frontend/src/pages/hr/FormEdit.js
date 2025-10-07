import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiSave, 
  FiEye, 
  FiPlus, 
  FiTrash2, 
  FiX,
  FiCheck,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';
import './FormEdit.css';
import FormPreview from './FormPreview';

const FormEdit = ({ formId, onBack, onSave }) => {
  // Preset option libraries to standardize forms
  const OPTION_PRESETS = {
    appraisalFivePoint: [
      { label: 'Does Not Meet Expectations', points: 1 },
      { label: 'Sometimes Meets Expectations / Needs Development', points: 2 },
      { label: 'Meets All Expectations', points: 3 },
      { label: 'Often Exceeds Expectations', points: 4 },
      { label: 'Consistently Exceeds Expectations', points: 5 }
    ],
    likertFive: [
      { label: 'Strongly Disagree', points: 1 },
      { label: 'Disagree', points: 2 },
      { label: 'Neutral', points: 3 },
      { label: 'Agree', points: 4 },
      { label: 'Strongly Agree', points: 5 }
    ],
    yesNo: ['Yes', 'No'],
    frequency: [
      { label: 'Never', points: 1 },
      { label: 'Rarely', points: 2 },
      { label: 'Sometimes', points: 3 },
      { label: 'Often', points: 4 },
      { label: 'Always', points: 5 }
    ]
  };

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // Single-page editor: details and questions shown together
  // Removed question type editing; only rating scale is supported
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    type: 'rating',
    question: '',
    options: [],
    required: true
  });
  const [showPreview, setShowPreview] = useState(false);

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
          options: [
            { label: 'Does Not Meet Expectations', points: 1 },
            { label: 'Sometimes Meets Expectations', points: 2 },
            { label: 'Meets All Expectations', points: 3 },
            { label: 'Often Exceeds Expectations', points: 4 },
            { label: 'Consistently Exceeds Expectations', points: 5 }
          ],
          required: true
        },
        {
          id: 2,
          type: 'rating',
          question: 'How would you rate your communication skills?',
          options: [
            { label: 'Needs Significant Improvement', points: 1 },
            { label: 'Needs Some Improvement', points: 2 },
            { label: 'Meets Expectations', points: 3 },
            { label: 'Exceeds Expectations', points: 4 },
            { label: 'Outstanding', points: 5 }
          ],
          required: true
        },
        {
          id: 3,
          type: 'rating',
          question: 'How would you rate your teamwork and collaboration?',
          options: [
            { label: 'Poor', points: 1 },
            { label: 'Fair', points: 2 },
            { label: 'Good', points: 3 },
            { label: 'Very Good', points: 4 },
            { label: 'Excellent', points: 5 }
          ],
          required: true
        }
      ],
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'Active',
      responses: 45,
      author: 'HR Team',
      // Appraisal forms are always identified and restricted by default
      responseType: 'identified',
      accessType: 'restricted'
    }
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setForm(sampleForms[formId] || sampleForms[1]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const handleFormChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuestionChange = (questionId, field, value) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === questionId) {
          const updatedQuestion = { ...q, [field]: value };
          
          // All questions are rating type, ensure options array exists
          if (field === 'type') {
            updatedQuestion.type = 'rating';
            updatedQuestion.options = q.options || [];
          }
          
          return updatedQuestion;
        }
        return q;
      })
    }));
  };

  const handleAddOption = (questionId) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: [...(q.options || []), { label: '', points: 1 }] }
          : q
      )
    }));
  };

  const handleOptionLabelChange = (questionId, optionIndex, value) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: (q.options || []).map((opt, idx) => {
                const normalized = typeof opt === 'string' ? { label: opt, points: ((q.options || []).length === 5 ? idx + 1 : 1) } : opt;
                return idx === optionIndex ? { ...normalized, label: value } : normalized;
              })
            }
          : q
      )
    }));
  };

  const handleOptionPointsChange = (questionId, optionIndex, pointsValue) => {
    const parsed = parseInt(pointsValue, 10) || 1;
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: (q.options || []).map((opt, idx) => {
                const normalized = typeof opt === 'string' ? { label: opt, points: ((q.options || []).length === 5 ? idx + 1 : 1) } : opt;
                return idx === optionIndex ? { ...normalized, points: Math.max(1, Math.min(5, parsed)) } : normalized;
              })
            }
          : q
      )
    }));
  };

  const handleRemoveOption = (questionId, optionIndex) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: (q.options || []).filter((_, idx) => idx !== optionIndex)
            }
          : q
      )
    }));
  };

  const applyPresetToQuestion = (questionId, presetKey) => {
    const preset = OPTION_PRESETS[presetKey] || [];
    const normalized = preset.map((opt, idx) => typeof opt === 'string' ? { label: opt, points: (preset.length === 5 ? idx + 1 : 1) } : opt);
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, options: normalized } : q
      )
    }));
  };

  const handleAddQuestion = () => {
    const newId = Math.max(...form.questions.map(q => q.id), 0) + 1;
    const question = {
      id: newId,
      type: 'rating',
      question: newQuestion.question,
      options: newQuestion.options || [],
      required: true
    };
    
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }));
    
    setNewQuestion({
      type: 'rating',
      question: '',
      options: [],
      required: true
    });
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (questionId) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleMoveQuestion = (questionId, direction) => {
    setForm(prev => {
      const questions = [...prev.questions];
      const index = questions.findIndex(q => q.id === questionId);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex >= 0 && newIndex < questions.length) {
        [questions[index], questions[newIndex]] = [questions[newIndex], questions[index]];
      }
      
      return { ...prev, questions };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    if (onSave) {
      onSave(form);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  // Question type UI removed; rating scale is the default and only type

  if (loading) {
    return (
      <div className="form-edit-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading form for editing...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="form-edit-container">
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
    <div className="form-edit-container">
      {/* Header */}
      <div className="form-edit-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            <FiArrowLeft />
            Back to Forms
          </button>
          <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/Sumeru_Logo.png" alt="Sumeru" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, color: '#0a3578' }}>Create Appraisal Form</span>
          </div>
          <div className="form-title-section">
            <input
              type="text"
              className="form-title-input"
              value={form.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="Form Title"
            />
            <div className="form-meta-header">
              <select
                className="category-select"
                value={form.category}
                onChange={(e) => handleFormChange('category', e.target.value)}
              >
                <option value="Performance">Performance</option>
                <option value="Feedback">Feedback</option>
                <option value="Leadership">Leadership</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Goals">Goals</option>
                <option value="Development">Development</option>
              </select>
              <select
                className="status-select"
                value={form.status}
                onChange={(e) => handleFormChange('status', e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handlePreview}>
            <FiEye />
            Preview
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="spinner-small"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs removed: single-page editor */}

      {/* Content */}
      <div className="form-edit-content">
        {showPreview && (
          <div className="add-question-modal">
            <div className="modal-content" style={{ width: 'min(900px, 95vw)', padding: 0 }}>
              <FormPreview form={form} onClose={() => setShowPreview(false)} isModal={true} />
            </div>
          </div>
        )}
        {/* Unified Details Section */}
        <div className="details-tab">
          <div className="form-details-card">
            <h3>Form Information</h3>
            <div className="form-field">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Describe the purpose of this form..."
                rows={4}
              />
            </div>
            <div className="form-field">
              <label>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => handleFormChange('author', e.target.value)}
                placeholder="Form author name"
              />
            </div>
            <div className="form-info-note">
              <div className="info-icon">ℹ️</div>
              <div className="info-content">
                <strong>Appraisal Form Configuration:</strong> This form is automatically configured for identified responses and restricted access. The deadline will be set when you assign this form to specific employees and their managers.
              </div>
            </div>
          </div>
        </div>

        {/* Unified Questions Section */}
        <div className="questions-tab">
            <div className="questions-header">
              <h3>Form Questions</h3>
              <button 
                className="btn-primary"
                onClick={() => setShowAddQuestion(true)}
              >
                <FiPlus />
                Add Question
              </button>
            </div>

            <div className="questions-list">
              {form.questions.map((question, index) => (
                <div key={question.id} className="question-edit-card">
                  <div className="question-header">
                    <div className="question-number">Q{index + 1}</div>
                    <div className="question-actions">
                      <button 
                        className="action-btn move-up"
                        onClick={() => handleMoveQuestion(question.id, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <FiArrowUp />
                      </button>
                      <button 
                        className="action-btn move-down"
                        onClick={() => handleMoveQuestion(question.id, 'down')}
                        disabled={index === form.questions.length - 1}
                        title="Move Down"
                      >
                        <FiArrowDown />
                      </button>
                      <button 
                        className="action-btn danger"
                        onClick={() => handleDeleteQuestion(question.id)}
                        title="Delete Question"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="question-content">
                    {/* Question type selector removed; rating scale by default */}

                    <div className="question-text-field">
                      <label>Question Text:</label>
                      <textarea
                        value={question.question}
                        onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                        placeholder="Enter your question..."
                        rows={2}
                      />
                    </div>

                    <div className="question-options">
                      <label>Rating Scale Options:</label>
                      <div className="preset-row">
                        <select
                          className="preset-select"
                          defaultValue=""
                          onChange={(e) => {
                            const key = e.target.value;
                            if (key) applyPresetToQuestion(question.id, key);
                          }}
                        >
                          <option value="" disabled>Use preset…</option>
                          <option value="appraisalFivePoint">Appraisal 5-point rating</option>
                          <option value="likertFive">Likert 5-point</option>
                          <option value="frequency">Frequency (Never → Always)</option>
                        </select>
                        <span className="preset-hint">Selecting a preset will replace current options.</span>
                      </div>
                        {(question.options || []).map((option, optIndex) => {
                          const optObj = typeof option === 'string' ? { label: option, points: ((question.options || []).length === 5 ? optIndex + 1 : 1) } : option;
                          return (
                            <div key={optIndex} className="option-edit">
                              <input
                                type="text"
                                value={optObj.label}
                                onChange={(e) => handleOptionLabelChange(question.id, optIndex, e.target.value)}
                                placeholder={`Option ${optIndex + 1}`}
                              />
                              <select
                                className="option-points-select"
                                value={optObj.points}
                                onChange={(e) => handleOptionPointsChange(question.id, optIndex, e.target.value)}
                                title="Points (1–5)"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                              <button 
                                className="remove-option-btn"
                                onClick={() => handleRemoveOption(question.id, optIndex)}
                              >
                                <FiX />
                              </button>
                            </div>
                          );
                        })}
                        <button 
                          className="add-option-btn"
                          onClick={() => handleAddOption(question.id)}
                        >
                          <FiPlus />
                          Add Option
                        </button>
                      </div>

                    {/* All questions are required by default; no toggle shown */}
                  </div>
                </div>
              ))}
            </div>

            {showAddQuestion && (
              <div className="add-question-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Add New Question</h3>
                    <button 
                      className="close-btn"
                      onClick={() => setShowAddQuestion(false)}
                    >
                      <FiX />
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* Question type section removed in modal; rating scale by default */}
                    <div className="form-field">
                      <label>Question Text</label>
                      <textarea
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                        placeholder="Enter your question..."
                        rows={2}
                      />
                    </div>
                    <div className="form-field">
                      <label>Rating Scale Options</label>
                        {(newQuestion.options || []).map((option, index) => {
                          const optObj = typeof option === 'string' ? { label: option, points: ((newQuestion.options || []).length === 5 ? index + 1 : 1) } : option;
                          return (
                            <div key={index} className="option-edit">
                              <input
                                type="text"
                                value={optObj.label}
                                onChange={(e) => {
                                  const newOptions = [...(newQuestion.options || [])];
                                  const normalized = typeof newOptions[index] === 'string' ? { label: newOptions[index], points: ((newQuestion.options || []).length === 5 ? index + 1 : 1) } : newOptions[index];
                                  newOptions[index] = { ...normalized, label: e.target.value };
                                  setNewQuestion(prev => ({ ...prev, options: newOptions }));
                                }}
                                placeholder={`Option ${index + 1}`}
                              />
                              <select
                                className="option-points-select"
                                value={optObj.points}
                                onChange={(e) => {
                                  const newOptions = [...(newQuestion.options || [])];
                                  const normalized = typeof newOptions[index] === 'string' ? { label: newOptions[index], points: ((newQuestion.options || []).length === 5 ? index + 1 : 1) } : newOptions[index];
                                  const parsed = parseInt(e.target.value, 10) || 1;
                                  newOptions[index] = { ...normalized, points: Math.max(1, Math.min(5, parsed)) };
                                  setNewQuestion(prev => ({ ...prev, options: newOptions }));
                                }}
                                title="Points (1–5)"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                              <button 
                                className="remove-option-btn"
                                onClick={() => {
                                  const newOptions = (newQuestion.options || []).filter((_, i) => i !== index);
                                  setNewQuestion(prev => ({ ...prev, options: newOptions }));
                                }}
                              >
                                <FiX />
                              </button>
                            </div>
                          );
                        })}
                        <button 
                          className="add-option-btn"
                          onClick={() => setNewQuestion(prev => ({ ...prev, options: [...(prev.options || []), { label: '', points: 1 }] }))}
                        >
                          <FiPlus />
                          Add Option
                        </button>
                      </div>
                    {/* All questions are required; no toggle in modal */}
                  </div>
                  <div className="modal-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => setShowAddQuestion(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.question.trim()}
                    >
                      <FiCheck />
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default FormEdit;
