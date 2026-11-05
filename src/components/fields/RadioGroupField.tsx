import React from 'react';
import { useFormContext, get, type FieldError } from 'react-hook-form';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  helperText?: string;
  className?: string;
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  label,
  options,
  required,
  helperText,
  className = '',
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const groupId = `field-${name.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  const error = get(errors, name) as FieldError | undefined;
  const hasError = !!error;

  const errorId = `${groupId}-error`;
  const helpId = `${groupId}-help`;

  return (
    <fieldset
      className={`form-field form-field-radio-group ${hasError ? 'has-error' : ''} ${className}`.trim()}
      aria-invalid={hasError ? 'true' : 'false'}
      aria-describedby={hasError ? errorId : helperText ? helpId : undefined}
    >
      <legend className="field-legend">
        <span>{label}</span>
        {required && (
          <span className="required-indicator" aria-hidden="true">
            {' '}*
          </span>
        )}
      </legend>

      {helperText && (
        <span id={helpId} className="field-helper-text">
          {helperText}
        </span>
      )}

      <div className="radio-options-container" role="radiogroup">
        {options.map((opt) => {
          const optId = `${groupId}-${opt.value}`;
          return (
            <div key={opt.value} className="radio-option-item">
              <input
                id={optId}
                type="radio"
                value={opt.value}
                className="field-radio"
                {...register(name)}
              />
              <label htmlFor={optId} className="radio-label">
                <span className="radio-title">{opt.label}</span>
                {opt.description && (
                  <span className="radio-description">{opt.description}</span>
                )}
              </label>
            </div>
          );
        })}
      </div>

      {hasError && error?.message && (
        <p id={errorId} role="alert" className="field-error-message">
          {error.message}
        </p>
      )}
    </fieldset>
  );
};
