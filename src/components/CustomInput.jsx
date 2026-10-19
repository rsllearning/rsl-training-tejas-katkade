export function CustomInput({
  label,
  id,
  error,
  helperText,
  ref,
  className = '',
  ...inputProps
}) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`field-input ${error ? 'input-has-error' : ''}`}
        {...inputProps}
      />
      {error && <span className="field-error-msg">{error}</span>}
      {helperText && !error && <span className="field-helper-msg">{helperText}</span>}
    </div>
  )
}
