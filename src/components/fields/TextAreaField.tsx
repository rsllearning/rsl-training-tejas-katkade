import React from 'react';
import { useFormContext, get, type FieldError } from 'react-hook-form';

export interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  helperText,
  required,
  id: propId,
  rows = 4,
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
    <div className={`form-field ${hasError ? 'has-error' : ''} ${className}`.trim()}>
      <label htmlFor={id} className="field-label">
        <span>{label}</span>
        {required && (
          <span className="required-indicator" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>

      {helperText && (
        <span id={helpId} className="field-helper-text">
          {helperText}
        </span>
      )}

      <textarea
        id={id}
        rows={rows}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={
          hasError ? errorId : helperText ? helpId : undefined
        }
        className={`field-textarea ${hasError ? 'input-error' : ''}`}
        {...register(name)}
        {...rest}
      />

      {hasError && error?.message && (
        <p id={errorId} role="alert" className="field-error-message">
          {error.message}
        </p>
      )}
    </div>
  );
};
