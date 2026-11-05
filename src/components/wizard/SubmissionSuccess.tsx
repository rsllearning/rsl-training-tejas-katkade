import React from 'react';
import type { SubmitSuccessResponse } from '../../api/mockApi';

export interface SubmissionSuccessProps {
  data: SubmitSuccessResponse['data'];
  onReset: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ data, onReset }) => {
  return (
    <div className="submission-success-card" role="region" aria-label="Application Submitted Successfully">
      <div className="success-icon" aria-hidden="true">
        ✅
      </div>
      <h2 className="success-title">Application Submitted Successfully!</h2>
      <p className="success-subtitle">
        Thank you, <strong>{data.candidateName}</strong>. Your job application for{' '}
        <strong>{data.position}</strong> has been received by the Raja Software Labs recruiting team.
      </p>

      <div className="success-details-box">
        <div className="success-detail-item">
          <span className="detail-label">Application Reference ID:</span>
          <span className="detail-value id-badge">{data.applicationId}</span>
        </div>
        <div className="success-detail-item">
          <span className="detail-label">Registered Email:</span>
          <span className="detail-value">{data.email}</span>
        </div>
        <div className="success-detail-item">
          <span className="detail-label">Submission Timestamp:</span>
          <span className="detail-value">{new Date(data.submittedAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="success-instructions">
        <p>
          A confirmation email has been dispatched. Our technical screening team will review your application and get in touch within 2-3 business days.
        </p>
      </div>

      <div className="success-actions">
        <button type="button" onClick={onReset} className="btn-primary">
          Submit Another Application
        </button>
      </div>
    </div>
  );
};
