import React from 'react';
import { useWatch } from 'react-hook-form';
import { SelectField, TextField, TextAreaField, CheckboxField } from '../fields';

/**
 * Isolated Character Counter component.
 * Narrow subscription on 'application.coverNote' ensures that typing
 * in the cover note only re-renders this tiny counter element,
 * and avoids re-rendering the surrounding step components and fields.
 */
const CoverNoteCharacterCount: React.FC<{ max: number }> = ({ max }) => {
  const note = useWatch({
    name: 'application.coverNote',
    defaultValue: '',
  });

  const count = (note || '').length;
  const isClose = count > max * 0.9;
  const isOver = count > max;

  return (
    <div
      className={`char-counter ${isOver ? 'counter-over' : isClose ? 'counter-warning' : ''}`}
      aria-live="polite"
    >
      <span>
        {count} / {max} characters
      </span>
    </div>
  );
};

export const Step4Application: React.FC = () => {
  const positionOptions = [
    { value: 'Frontend Developer', label: 'Frontend Developer (React / TypeScript)' },
    { value: 'Backend Developer', label: 'Backend Developer (Node.js / Go / Java)' },
    { value: 'Full Stack Engineer', label: 'Full Stack Engineer' },
    { value: 'Quality Assurance Engineer', label: 'QA / Test Automation Engineer' },
    { value: 'DevOps / Cloud Engineer', label: 'DevOps & Cloud Infrastructure' },
    { value: 'Mobile Application Developer', label: 'Mobile Developer (React Native / iOS / Android)' },
  ];

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Step 4: Application Details</h2>
        <p className="step-description">
          Tell us about the role you are applying for and your availability.
        </p>
      </div>

      <div className="form-grid">
        <SelectField
          name="application.position"
          label="Position Applied For"
          options={positionOptions}
          placeholder="-- Select a position --"
          required
        />

        <TextField
          name="application.expectedJoiningDate"
          label="Expected Joining Date"
          type="date"
          helperText="Must be today or a future date."
          required
        />

        <TextField
          name="application.portfolioUrl"
          label="Portfolio / GitHub / LinkedIn Link (Optional)"
          type="url"
          placeholder="https://github.com/your-username"
        />

        <div className="textarea-with-counter">
          <TextAreaField
            name="application.coverNote"
            label="Cover Note / Why RSL? (Optional)"
            placeholder="Tell us briefly why you would like to join Raja Software Labs..."
            rows={4}
            maxLength={1000}
          />
          <CoverNoteCharacterCount max={1000} />
        </div>

        <div className="terms-container">
          <CheckboxField
            name="application.agreeToTerms"
            label={
              <span>
                I confirm that all details provided in this application are accurate and true to the best of my knowledge.
              </span>
            }
            required
          />
        </div>
      </div>
    </div>
  );
};
