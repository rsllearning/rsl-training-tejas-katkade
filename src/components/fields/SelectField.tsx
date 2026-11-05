import React from 'react';
import { useFormContext, get, type FieldError } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = '-- Select an option --',
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

      <select
        id={id}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={
          hasError ? errorId : helperText ? helpId : undefined
        }
        className={`field-select ${hasError ? 'input-error' : ''}`}
        {...register(name)}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && error?.message && (
        <p id={errorId} role="alert" className="field-error-message">
          {error.message}
        </p>
      )}
    </div>
  );
};
