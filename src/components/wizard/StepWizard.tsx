import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { JobApplicationFormData } from '../../schemas';
import { submitJobApplication, type ApiSimulationMode, type SubmitSuccessResponse } from '../../api/mockApi';
import { Step1Personal } from './Step1Personal';
import { Step2Education } from './Step2Education';
import { Step3Experience } from './Step3Experience';
import { Step4Application } from './Step4Application';
import { Step5Review } from './Step5Review';
import { SubmissionSuccess } from './SubmissionSuccess';

const STEPS = [
  { id: 1, title: 'Personal', description: 'Personal Details' },
  { id: 2, title: 'Education', description: 'Academic Background' },
  { id: 3, title: 'Experience', description: 'Employment History' },
  { id: 4, title: 'Application', description: 'Role & Joining' },
  { id: 5, title: 'Review', description: 'Review & Submit' },
];

export const StepWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [simulationMode, setSimulationMode] = useState<ApiSimulationMode>('success');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmitSuccessResponse['data'] | null>(null);

  const {
    trigger,
    handleSubmit,
    setError,
    setFocus,
    reset,
  } = useFormContext<JobApplicationFormData>();

  // Validate only the current step before advancing
  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger('personal', { shouldFocus: true });
    } else if (currentStep === 2) {
      isValid = await trigger('education', { shouldFocus: true });
    } else if (currentStep === 3) {
      isValid = await trigger('experience', { shouldFocus: true });
    } else if (currentStep === 4) {
      isValid = await trigger('application', { shouldFocus: true });
    }

    if (isValid) {
      setServerError(null);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setServerError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditStep = (stepNumber: number) => {
    setServerError(null);
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form submission handler on Step 5
  const onSubmit = async (data: JobApplicationFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await submitJobApplication(data, simulationMode);

      if (result.type === 'success') {
        setSubmissionSuccess(result.data);
      } else if (result.type === 'validation') {
        // Outcome 2: Server-side validation failure returned by server
        // Apply field-level errors to RHF state
        Object.entries(result.fieldErrors).forEach(([fieldPath, message]) => {
          setError(fieldPath as any, {
            type: 'server',
            message,
          });
        });

        // Navigate back to the step containing the invalid field
        const firstErrorField = Object.keys(result.fieldErrors)[0];
        if (firstErrorField.startsWith('personal.')) {
          setCurrentStep(1);
        } else if (firstErrorField.startsWith('education.')) {
          setCurrentStep(2);
        } else if (firstErrorField.startsWith('experience.')) {
          setCurrentStep(3);
        } else if (firstErrorField.startsWith('application.')) {
          setCurrentStep(4);
        }

        // Set focus to the first invalid field
        setTimeout(() => {
          setFocus(firstErrorField as any);
        }, 150);
      } else if (result.type === 'server_error') {
        // Outcome 3: Server error (500)
        setServerError(result.message);
      }
    } catch {
      setServerError('An unexpected error occurred while communicating with the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    reset();
    setCurrentStep(1);
    setSubmissionSuccess(null);
    setServerError(null);
  };

  if (submissionSuccess) {
    return <SubmissionSuccess data={submissionSuccess} onReset={handleResetForm} />;
  }

  return (
    <div className="wizard-container">
      {/* Stepper Navigation Progress Bar */}
      <nav aria-label="Job Application Form Steps" className="stepper-navigation">
        <ol className="stepper-list">
          {STEPS.map((step) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <li
                key={step.id}
                className={`stepper-item ${isCurrent ? 'step-current' : ''} ${
                  isCompleted ? 'step-completed' : ''
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div className="stepper-badge" aria-hidden="true">
                  {isCompleted ? '✓' : step.id}
                </div>
                <div className="stepper-meta">
                  <span className="stepper-label">{step.title}</span>
                  <span className="stepper-sublabel">{step.description}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="wizard-form">
        <div className="step-panel" role="region" aria-label={`Step ${currentStep} Form Fields`}>
          {currentStep === 1 && <Step1Personal />}
          {currentStep === 2 && <Step2Education />}
          {currentStep === 3 && <Step3Experience />}
          {currentStep === 4 && <Step4Application />}
          {currentStep === 5 && (
            <Step5Review
              onEditStep={handleEditStep}
              simulationMode={simulationMode}
              onSimulationModeChange={setSimulationMode}
              isSubmitting={isSubmitting}
              serverError={serverError}
            />
          )}
        </div>

        {/* Wizard Footer Navigation Controls */}
        <div className="wizard-actions">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="btn-secondary"
            >
              ← Back
            </button>
          )}

          <div className="actions-spacer" />

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-submit"
            >
              {isSubmitting ? (
                <span className="btn-loading-wrapper">
                  <span className="spinner" aria-hidden="true" />
                  Submitting Application...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
