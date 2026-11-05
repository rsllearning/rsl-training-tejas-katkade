import React from 'react';
import { useFieldArray, useFormContext, useWatch, get } from 'react-hook-form';
import type { JobApplicationFormData } from '../../schemas';
import { RadioGroupField, TextField, SelectField } from '../fields';

/**
 * Fresher-specific fields component.
 */
const FresherFields: React.FC = () => {
  const availabilityOptions = [
    { value: 'Immediate', label: 'Immediate (within a few days)' },
    { value: '15 Days', label: 'Within 15 days' },
    { value: '1 Month', label: 'Within 1 month' },
    { value: '2 Months', label: 'Within 2 months' },
    { value: '3 Months', label: 'Within 3 months' },
  ];

  return (
    <div className="conditional-section fresher-section">
      <h3 className="section-subtitle">Fresher Information</h3>
      <p className="section-note">
        Tell us when you are ready to join Raja Software Labs.
      </p>

      <div className="form-grid form-grid-2col">
        <SelectField
          name="experience.availabilityToJoin"
          label="Availability to Join"
          options={availabilityOptions}
          placeholder="-- Select your availability --"
          required
        />
      </div>
    </div>
  );
};

/**
 * Experienced-specific fields component with repeating company entries.
 */
const ExperiencedFields: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JobApplicationFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience.companies',
  });

  const arrayError = get(errors, 'experience.companies') as { message?: string } | undefined;
  const rootErrorMessage = arrayError?.message;

  const handleAddCompany = () => {
    append({
      companyName: '',
      role: '',
      fromDate: '',
      toDate: '',
    });
  };

  return (
    <div className="conditional-section experienced-section">
      <h3 className="section-subtitle">Work Experience Overview</h3>

      <div className="form-grid form-grid-2col">
        <TextField
          name="experience.totalExperienceYears"
          label="Total Experience (Years)"
          type="number"
          step="0.1"
          placeholder="e.g. 2.5"
          min={0.1}
          max={50}
          required
        />

        <TextField
          name="experience.noticePeriodDays"
          label="Notice Period (Days)"
          type="number"
          placeholder="e.g. 30 (0 if serving/none)"
          min={0}
          max={365}
          required
        />
      </div>

      <div className="experience-companies-wrapper">
        <div className="companies-header">
          <h4 className="companies-title">Previous Employment History</h4>
          <p className="companies-description">
            Add at least one previous employer. "To" date must be after "From" date.
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
                <h5 className="repeating-item-title">Company #{index + 1}</h5>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn-danger-text"
                    aria-label={`Remove company ${index + 1}`}
                  >
                    Remove Company
                  </button>
                )}
              </div>

              <div className="form-grid form-grid-2col">
                <TextField
                  name={`experience.companies.${index}.companyName`}
                  label="Company Name"
                  placeholder="e.g. Infosys Ltd."
                  required
                />

                <TextField
                  name={`experience.companies.${index}.role`}
                  label="Role / Designation"
                  placeholder="e.g. Software Engineer"
                  required
                />

                <TextField
                  name={`experience.companies.${index}.fromDate`}
                  label="From Date"
                  type="date"
                  required
                />

                <TextField
                  name={`experience.companies.${index}.toDate`}
                  label="To Date"
                  type="date"
                  helperText="Must be on or after From Date"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="repeating-actions">
          <button
            type="button"
            onClick={handleAddCompany}
            className="btn-secondary"
          >
            + Add Another Company
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Isolated conditional component using narrow subscription (useWatch)
 * to avoid re-rendering the parent step or siblings when switching or typing.
 */
const ExperienceConditionalFields: React.FC = () => {
  const status = useWatch({
    name: 'experience.status',
  });

  if (status === 'experienced') {
    return <ExperiencedFields />;
  }

  return <FresherFields />;
};

/**
 * Step 3: Experience Step Container
 */
export const Step3Experience: React.FC = () => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Step 3: Professional Experience</h2>
        <p className="step-description">
          Please indicate your experience level. Additional fields will adapt based on your selection.
        </p>
      </div>

      <div className="experience-type-selector">
        <RadioGroupField
          name="experience.status"
          label="Experience Level"
          options={[
            {
              value: 'fresher',
              label: 'Fresher',
              description: 'Recent graduate or no prior professional full-time experience',
            },
            {
              value: 'experienced',
              label: 'Experienced Professional',
              description: 'Has prior full-time industry / corporate work experience',
            },
          ]}
          required
        />
      </div>

      {/* Isolated sub-tree that watches experience.status */}
      <ExperienceConditionalFields />
    </div>
  );
};
