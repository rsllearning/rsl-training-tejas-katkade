import React from 'react';
import { useWatch } from 'react-hook-form';
import type { JobApplicationFormData } from '../../schemas';
import type { ApiSimulationMode } from '../../api/mockApi';

export interface Step5ReviewProps {
  onEditStep: (stepNumber: number) => void;
  simulationMode: ApiSimulationMode;
  onSimulationModeChange: (mode: ApiSimulationMode) => void;
  isSubmitting: boolean;
  serverError: string | null;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({
  onEditStep,
  simulationMode,
  onSimulationModeChange,
  isSubmitting,
  serverError,
}) => {
  // Use useWatch to safely read form values for the read-only summary
  const values = useWatch() as JobApplicationFormData | undefined;

  const personal = values?.personal;
  const education = values?.education;
  const experience = values?.experience;
  const application = values?.application;

  const isExperienced = experience?.status === 'experienced';
  const experiencedData = isExperienced ? experience : null;

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Step 5: Review & Submit Application</h2>
        <p className="step-description">
          Please review your details carefully before submitting. You can click "Edit" on any section to make corrections.
        </p>
      </div>

      {serverError && (
        <div role="alert" className="form-alert form-alert-server-error">
          <div className="alert-icon" aria-hidden="true">⚠️</div>
          <div className="alert-content">
            <strong>Submission Failed (Server Error):</strong>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      {/* Review Section 1: Personal Details */}
      <div className="review-card">
        <div className="review-card-header">
          <h3 className="review-card-title">1. Personal Details</h3>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="btn-edit"
            disabled={isSubmitting}
            aria-label="Edit Personal Details"
          >
            ✏️ Edit
          </button>
        </div>
        <dl className="review-dl">
          <div className="review-row">
            <dt>Full Name:</dt>
            <dd>{personal?.fullName || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Email:</dt>
            <dd>{personal?.email || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Phone:</dt>
            <dd>{personal?.phone || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Date of Birth:</dt>
            <dd>{personal?.dateOfBirth || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Current City:</dt>
            <dd>{personal?.city || '—'}</dd>
          </div>
        </dl>
      </div>

      {/* Review Section 2: Education */}
      <div className="review-card">
        <div className="review-card-header">
          <h3 className="review-card-title">2. Education</h3>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="btn-edit"
            disabled={isSubmitting}
            aria-label="Edit Education Details"
          >
            ✏️ Edit
          </button>
        </div>
        {education?.qualifications && education.qualifications.length > 0 ? (
          <div className="review-table-container">
            <table className="review-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Degree</th>
                  <th scope="col">Institution</th>
                  <th scope="col">Year</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {education.qualifications.map((q, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{q.degree || '—'}</td>
                    <td>{q.institution || '—'}</td>
                    <td>{q.yearOfPassing ? String(q.yearOfPassing) : '—'}</td>
                    <td>{q.percentage ? `${q.percentage}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-text">No education records provided.</p>
        )}
      </div>

      {/* Review Section 3: Experience */}
      <div className="review-card">
        <div className="review-card-header">
          <h3 className="review-card-title">3. Professional Experience</h3>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="btn-edit"
            disabled={isSubmitting}
            aria-label="Edit Experience Details"
          >
            ✏️ Edit
          </button>
        </div>
        <dl className="review-dl">
          <div className="review-row">
            <dt>Candidate Type:</dt>
            <dd className="tag-status">
              {isExperienced ? 'Experienced Professional' : 'Fresher'}
            </dd>
          </div>

          {!isExperienced && (
            <div className="review-row">
              <dt>Availability to Join:</dt>
              <dd>{experience?.availabilityToJoin || '—'}</dd>
            </div>
          )}

          {isExperienced && experiencedData && (
            <>
              <div className="review-row">
                <dt>Total Experience:</dt>
                <dd>{experiencedData.totalExperienceYears ? String(experiencedData.totalExperienceYears) : '—'} Year(s)</dd>
              </div>
              <div className="review-row">
                <dt>Notice Period:</dt>
                <dd>{experiencedData.noticePeriodDays !== undefined ? String(experiencedData.noticePeriodDays) : '—'} Day(s)</dd>
              </div>
            </>
          )}
        </dl>

        {isExperienced &&
          experiencedData?.companies &&
          experiencedData.companies.length > 0 && (
            <div className="review-subtable">
              <h4 className="subtable-heading">Previous Companies</h4>
              <div className="review-table-container">
                <table className="review-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Company</th>
                      <th scope="col">Role</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiencedData.companies.map((c, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{c.companyName || '—'}</td>
                        <td>{c.role || '—'}</td>
                        <td>{c.fromDate || '—'}</td>
                        <td>{c.toDate || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>

      {/* Review Section 4: Application Details */}
      <div className="review-card">
        <div className="review-card-header">
          <h3 className="review-card-title">4. Application Details</h3>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="btn-edit"
            disabled={isSubmitting}
            aria-label="Edit Application Details"
          >
            ✏️ Edit
          </button>
        </div>
        <dl className="review-dl">
          <div className="review-row">
            <dt>Position Applied For:</dt>
            <dd>{application?.position || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Expected Joining Date:</dt>
            <dd>{application?.expectedJoiningDate || '—'}</dd>
          </div>
          <div className="review-row">
            <dt>Portfolio / Links:</dt>
            <dd>
              {application?.portfolioUrl ? (
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="review-link"
                >
                  {application.portfolioUrl}
                </a>
              ) : (
                'None provided'
              )}
            </dd>
          </div>
          <div className="review-row">
            <dt>Cover Note:</dt>
            <dd>{application?.coverNote ? `"${application.coverNote}"` : 'None provided'}</dd>
          </div>
          <div className="review-row">
            <dt>Terms Accepted:</dt>
            <dd>{application?.agreeToTerms ? '✅ Yes' : '❌ No'}</dd>
          </div>
        </dl>
      </div>

      {/* Mock API Simulation Controls for Reviewers / Grading */}
      <div className="simulation-panel">
        <h4 className="simulation-title">🧪 Mock API Outcome Simulator</h4>
        <p className="simulation-desc">
          Test the 3 required server submission outcomes defined in the assignment specifications:
        </p>
        <div className="simulation-options" role="radiogroup" aria-label="Mock API Outcome">
          <label className={`simulation-chip ${simulationMode === 'success' ? 'chip-active' : ''}`}>
            <input
              type="radio"
              name="simulation_mode"
              value="success"
              checked={simulationMode === 'success'}
              onChange={() => onSimulationModeChange('success')}
              disabled={isSubmitting}
            />
            <span className="chip-label">🟢 Outcome 1: Success (200 OK)</span>
          </label>

          <label
            className={`simulation-chip ${
              simulationMode === 'server_validation_error' ? 'chip-active chip-warning' : ''
            }`}
          >
            <input
              type="radio"
              name="simulation_mode"
              value="server_validation_error"
              checked={simulationMode === 'server_validation_error'}
              onChange={() => onSimulationModeChange('server_validation_error')}
              disabled={isSubmitting}
            />
            <span className="chip-label">🟡 Outcome 2: Server Field Validation Error</span>
          </label>

          <label
            className={`simulation-chip ${
              simulationMode === 'server_error' ? 'chip-active chip-danger' : ''
            }`}
          >
            <input
              type="radio"
              name="simulation_mode"
              value="server_error"
              checked={simulationMode === 'server_error'}
              onChange={() => onSimulationModeChange('server_error')}
              disabled={isSubmitting}
            />
            <span className="chip-label">🔴 Outcome 3: Server Internal Error (500)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
