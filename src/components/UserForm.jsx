import { useState } from 'react'
import { useCreateUser } from '../hooks/useCreateUser'

/**
 * Form to create a new user via useCreateUser() mutation
 */
export function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('User')
  const [formError, setFormError] = useState('')

  const {
    mutate: createUserMutation,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  } = useCreateUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!name.trim()) {
      setFormError('Please enter user name.')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.')
      return
    }

    createUserMutation(
      { name, email, role },
      {
        onSuccess: () => {
          setName('')
          setEmail('')
          setRole('User')
          setTimeout(() => reset(), 3000)
        },
      }
    )
  }

  return (
    <div className="card form-card">
      <h3>Add New User</h3>

      {/* Validation or API error */}
      {(formError || isError) && (
        <div className="alert alert-danger" role="alert">
          {formError || error?.message || 'Failed to create user.'}
        </div>
      )}

      {/* Mutation success */}
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          ✓ User created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="user-name">Full Name *</label>
          <input
            id="user-name"
            type="text"
            placeholder="e.g. Sarah Connor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-email">Email Address *</label>
          <input
            id="user-email"
            type="email"
            placeholder="e.g. sarah@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-role">Role</label>
          <select
            id="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isPending}
            className="form-select"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
            <option value="User">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="mini-spinner" /> Creating User...
            </>
          ) : (
            'Add User'
          )}
        </button>
      </form>
    </div>
  )
}
