import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppraisalForm.css';
import { getAppraisalForm, submitAppraisalForm } from '../../utils/appraisalUtils';

const AppraisalForm = () => {
  const navigate = useNavigate();
  const [formId, setFormId] = useState(null);
  const [month, setMonth] = useState('February');
  const [year, setYear] = useState('2025');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    taskManagement: '',
    qualityOfWork: '',
    punctuality: '',
    communication: '',
    problemSolving: '',
    initiative: '',
    teamwork: '',
    adaptability: '',
    resourceUtilization: '',
    goalAlignment: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || '1';
    setFormId(parseInt(id));
    const existing = getAppraisalForm(id);
    if (existing) {
      if (existing.month) setMonth(existing.month);
      if (existing.year) setYear(existing.year);
      if (existing.formData) setFormData(existing.formData);
    }
  }, []);

  const evaluationFields = [
    { key: 'taskManagement', label: 'Task Management' },
    { key: 'qualityOfWork', label: 'Quality of Work' },
    { key: 'punctuality', label: 'Punctuality' },
    { key: 'communication', label: 'Communication' },
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'initiative', label: 'Initiative/Proactiveness' },
    { key: 'teamwork', label: 'Teamwork' },
    { key: 'adaptability', label: 'Adaptability' },
    { key: 'resourceUtilization', label: 'Resource Utilization' },
    { key: 'goalAlignment', label: 'Goal Alignment' }
  ];

  const options = [
    'Does Not Meet Expectations',
    'Sometimes Meets Expectations / Needs Development',
    'Meets All Expectations',
    'Often Exceeds Expectations',
    'Consistently Exceeds Expectations'
  ];

  const onChangeField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    navigate('/appraisal');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formId) return;
    setIsSubmitting(true);
    try {
      const result = submitAppraisalForm(formId, formData);
      if (result.success) {
        alert('Appraisal submitted successfully!');
        navigate('/appraisal');
      } else {
        alert('Failed to submit appraisal. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="af-page">
      <div className="af-card">
        <div className="af-header">
          <h1 className="af-title">Appraisal Form {month}- {year}</h1>
          <p className="af-subtitle">Provide your self-evaluation.</p>
        </div>

        <form className="af-form" onSubmit={handleSubmit}>
          {evaluationFields.map(field => (
            <div className="af-field" key={field.key}>
              <label className="af-label">{field.label}</label>
              <select
                className="af-select"
                value={formData[field.key]}
                onChange={(e) => onChangeField(field.key, e.target.value)}
                required
              >
                <option value="">-Select option-</option>
                {options.map(opt => (
                  <option value={opt} key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="af-actions">
            <button type="button" className="af-btn af-btn-cancel" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="af-btn af-btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Self Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppraisalForm;


