import React, { useState } from 'react';
import { FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './FormPreview.css';

const FormPreview = ({ form, onClose, isModal = true }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < form.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted with responses:', responses);
    setShowResults(true);
  };

  const renderQuestion = (question) => {
    const currentResponse = responses[question.id] || '';

    switch (question.type) {
      case 'text':
        return (
          <div className="question-input">
            <textarea
              value={currentResponse}
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
              placeholder="Enter your answer here..."
              rows={4}
            />
          </div>
        );

      case 'rating': {
        const normalized = question.options.map((opt, idx) =>
          typeof opt === 'string' ? { label: opt, points: (question.options.length === 5 ? idx + 1 : 1) } : opt
        );
        return (
          <div className="rating-options">
            {normalized.map((option, index) => (
              <label key={index} className="rating-option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.points}
                  checked={currentResponse === String(option.points)}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
                <span className="rating-label">{option.label} ({option.points})</span>
              </label>
            ))}
          </div>
        );
      }

      case 'multiple-choice': {
        const normalized = question.options.map((opt, idx) =>
          typeof opt === 'string' ? { label: opt, points: (question.options.length === 5 ? idx + 1 : 1) } : opt
        );
        const currentValues = currentResponse ? currentResponse.split(',') : [];
        return (
          <div className="multiple-choice-options">
            {normalized.map((option, index) => (
              <label key={index} className="choice-option">
                <input
                  type="checkbox"
                  value={`${option.label}::${option.points}`}
                  checked={currentValues.includes(`${option.label}::${option.points}`)}
                  onChange={(e) => {
                    const values = new Set(currentValues);
                    const token = `${option.label}::${option.points}`;
                    if (e.target.checked) {
                      values.add(token);
                    } else {
                      values.delete(token);
                    }
                    handleResponseChange(question.id, Array.from(values).join(','));
                  }}
                />
                <span className="choice-label">{option.label} ({option.points})</span>
              </label>
            ))}
          </div>
        );
      }

      default:
        return <div>Unknown question type</div>;
    }
  };

  const renderResults = () => (
    <div className="preview-results">
      <h3>Form Preview Complete</h3>
      <p>This is how your form will look to users. Here's a summary of the responses:</p>
      <div className="results-summary">
        {form.questions.map((question, index) => (
          <div key={question.id} className="result-item">
            <h4>Q{index + 1}: {question.question}</h4>
            <p><strong>Response:</strong> {responses[question.id] || 'No response'}</p>
          </div>
        ))}
      </div>
      <div className="results-actions">
        <button className="btn-secondary" onClick={() => setShowResults(false)}>
          Edit Form
        </button>
        <button className="btn-primary" onClick={onClose}>
          Close Preview
        </button>
      </div>
    </div>
  );

  if (!form) {
    return (
      <div className="form-preview-container">
        <div className="preview-error">
          <h3>No form to preview</h3>
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="form-preview-container">
        {isModal && (
          <div className="preview-header">
            <h2>Form Preview - {form.title}</h2>
            <button className="close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>
        )}
        <div className="preview-content">
          {renderResults()}
        </div>
      </div>
    );
  }

  const currentQ = form.questions[currentQuestion];

  return (
    <div className="form-preview-container">
      {isModal && (
        <div className="preview-header">
          <h2>Form Preview - {form.title}</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
      )}
      
      <div className="preview-content">
        <div className="preview-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / form.questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {form.questions.length}
          </span>
        </div>

        <div className="preview-question">
          <div className="question-header">
            <h3>{currentQ.question}</h3>
            {currentQ.required && (
              <span className="required-indicator">* Required</span>
            )}
          </div>
          
          <div className="question-content">
            {renderQuestion(currentQ)}
          </div>
        </div>

        <div className="preview-navigation">
          <button 
            className="btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <FiArrowLeft />
            Previous
          </button>
          
          <div className="question-indicators">
            {form.questions.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentQuestion ? 'active' : ''} ${
                  responses[form.questions[index].id] ? 'answered' : ''
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === form.questions.length - 1 ? (
            <button className="btn-primary" onClick={handleSubmit}>
              Submit Form
            </button>
          ) : (
            <button className="btn-primary" onClick={handleNext}>
              Next
              <FiArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;

