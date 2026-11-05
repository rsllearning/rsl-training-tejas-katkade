import React from 'react';
import { useFieldArray, useFormContext, get } from 'react-hook-form';
import type { JobApplicationFormData } from '../../schemas';
import { TextField } from '../fields';

const MAX_PASSING_YEAR = new Date().getFullYear() + 5;

export const Step2Education: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JobApplicationFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education.qualifications',
  });

  const arrayError = get(errors, 'education.qualifications') as { message?: string } | undefined;
  const rootErrorMessage = arrayError?.message;

  const handleAddQualification = () => {
    append({
      degree: '',
      institution: '',
      yearOfPassing: '' as unknown as number,
      percentage: '' as unknown as number,
    });
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Step 2: Education Details</h2>
        <p className="step-description">
          Add your educational background. At least one qualification is required.
        </p>
      </div>

      {rootErrorMessage && (
        <div role="alert" className="form-alert form-alert-error">
          {rootErrorMessage}
        </div>
      )}

      <div className="repeating-list">
        {fields.map((field, index) => (
          <div key={field.id} className="repeating-item-card">
            <div className="repeating-item-header">
              <h3 className="repeating-item-title">Qualification #{index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-danger-text"
                  aria-label={`Remove qualification ${index + 1}`}
                >
                  Remove Entry
                </button>
              )}
            </div>

            <div className="form-grid form-grid-2col">
              <TextField
                name={`education.qualifications.${index}.degree`}
                label="Degree / Course"
                placeholder="e.g. B.Tech Computer Science"
                required
              />

              <TextField
                name={`education.qualifications.${index}.institution`}
                label="Institution / University"
                placeholder="e.g. Pune University"
                required
              />

              <TextField
                name={`education.qualifications.${index}.yearOfPassing`}
                label="Year of Passing"
                type="number"
                placeholder="e.g. 2024"
                min={1960}
                max={MAX_PASSING_YEAR}
                required
              />

              <TextField
                name={`education.qualifications.${index}.percentage`}
                label="Percentage (%)"
                type="number"
                step="0.01"
                placeholder="e.g. 85.50"
                min={0}
                max={100}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="repeating-actions">
        <button
          type="button"
          onClick={handleAddQualification}
          className="btn-secondary"
        >
          + Add Another Qualification
        </button>
      </div>
    </div>
  );
};
