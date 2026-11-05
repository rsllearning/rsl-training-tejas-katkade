import React from 'react';
import { useFormContext, get, type FieldError } from 'react-hook-form';

export interface CheckboxFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label: React.ReactNode;
  helperText?: string;
  required?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  helperText,
  required,
  id: propId,
  className = '',
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const id = propId || `field-${name.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  const error = get(errors, name) as FieldError | undefined;
  const hasError = !!error;

  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className={`form-field form-field-checkbox ${hasError ? 'has-error' : ''} ${className}`.trim()}>
      <div className="checkbox-control-wrapper">
        <input
          id={id}
          type="checkbox"
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError ? errorId : helperText ? helpId : undefined
          }
          className={`field-checkbox ${hasError ? 'input-error' : ''}`}
          {...register(name)}
          {...rest}
        />
        <label htmlFor={id} className="checkbox-label">
          <span>{label}</span>
          {required && (
            <span className="required-indicator" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>
      </div>

      {helperText && (
        <span id={helpId} className="field-helper-text">
          {helperText}
        </span>
      )}

      {hasError && error?.message && (
        <p id={errorId} role="alert" className="field-error-message">
          {error.message}
        </p>
      )}
    </div>
  );
};
