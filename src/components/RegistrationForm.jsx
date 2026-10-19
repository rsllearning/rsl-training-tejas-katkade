import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { useUser } from '../context/useUser'
import { apiRegister } from '../data/mockProducts'
import { CustomInput } from './CustomInput'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn btn-primary submit-btn ${pending ? 'btn-disabled' : ''}`}
    >
      {pending ? (
        <span className="spinner-text">
          <span className="mini-spinner" aria-hidden="true" />
          Creating Account...
        </span>
      ) : (
        'Create Account'
      )}
    </button>
  )
}

export function RegistrationForm({ onRegistrationSuccess }) {
  const { setUser } = useUser()
  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name')?.toString().trim() || ''
      const email = formData.get('email')?.toString().trim() || ''
      const password = formData.get('password')?.toString() || ''

      const validationErrors = {}

      if (!name) {
        validationErrors.name = 'Please enter your full name.'
      } else if (name.length < 2) {
        validationErrors.name = 'Name must be at least 2 characters.'
      }

      if (!email) {
        validationErrors.email = 'Please enter your email address.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.email = 'Please enter a valid email address.'
      }

      if (!password) {
        validationErrors.password = 'Please enter a password.'
      } else if (password.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters.'
      }

      if (Object.keys(validationErrors).length > 0) {
        return {
          status: 'error',
          message: 'Please fill in all required fields correctly.',
          errors: validationErrors,
          values: { name, email },
        }
      }

      try {
        const result = await apiRegister({ name, email, password })
        setUser(result.user)

        if (onRegistrationSuccess) {
          onRegistrationSuccess(result.user)
        }

        return {
          status: 'success',
          message: `Welcome, ${result.user.name}! Your account has been registered.`,
          errors: {},
          values: { name: '', email: '' },
        }
      } catch (err) {
        return {
          status: 'error',
          message: err.message,
          errors: { server: err.message },
          values: { name, email },
        }
      }
    },
    {
      status: 'idle',
      message: '',
      errors: {},
      values: { name: '', email: '' },
    }
  )

  return (
    <div className="registration-container">
      <title>Register – Mini Store</title>
      <meta
        name="description"
        content="Register an account on Mini Store to browse and purchase products."
      />

      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Create an Account</h2>
          <p className="form-subtitle">
            Sign up to start shopping and manage your orders.
          </p>
        </div>

        {state.status === 'success' && (
          <div className="alert alert-success" role="alert">
            <span className="alert-icon">✓</span>
            <div>
              <strong>Account Created!</strong>
              <p>{state.message}</p>
            </div>
          </div>
        )}

        {state.status === 'error' && state.message && (
          <div className="alert alert-danger" role="alert">
            <span className="alert-icon">⚠️</span>
            <div>
              <p>{state.message}</p>
            </div>
          </div>
        )}

        <form action={formAction} className="registration-form" noValidate>
          {/* CustomInput receives ref directly as a prop */}
          <CustomInput
            ref={nameInputRef}
            id="reg-name"
            name="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            defaultValue={state.values?.name || ''}
            error={state.errors?.name}
            disabled={isPending}
          />

          <CustomInput
            id="reg-email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            defaultValue={state.values?.email || ''}
            error={state.errors?.email}
            disabled={isPending}
          />

          <CustomInput
            id="reg-password"
            name="password"
            type="password"
            label="Password"
            placeholder="At least 6 characters"
            error={state.errors?.password}
            disabled={isPending}
          />

          <div className="form-actions">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
