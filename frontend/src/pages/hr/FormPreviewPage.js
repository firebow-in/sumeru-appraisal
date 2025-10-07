import React from 'react';
import FormPreview from './FormPreview';

const FormPreviewPage = ({ form, onBack }) => {
  if (!form) {
    return (
      <div className="form-preview-container">
        <div className="preview-error">
          <h3>No form to preview</h3>
          {onBack && (
            <button className="btn-primary" onClick={onBack}>Back</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="form-preview-page" style={{ padding: 16 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FormPreview form={form} onClose={onBack || (() => {})} isModal={false} />
      </div>
    </div>
  );
};

export default FormPreviewPage;



