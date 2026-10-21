import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useDeleteUser } from '../hooks/useDeleteUser'

/**
 * User list displaying users and supporting deletion with optimistic update
 */
export function UserList() {
  const { data: users, isPending, isError, error, isFetching } = useUsers()
  const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser()

  const [deletingId, setDeletingId] = useState(null)
  const [deleteStatusMessage, setDeleteStatusMessage] = useState('')

  const handleDelete = (userId, userName) => {
    setDeletingId(userId)
    setDeleteStatusMessage('')

    deleteUserMutation(userId, {
      onSuccess: () => {
        setDeleteStatusMessage(`✓ Deleted "${userName}".`)
        setDeletingId(null)
      },
      onError: (err) => {
        setDeleteStatusMessage(`Failed to delete "${userName}": ${err.message}`)
        setDeletingId(null)
      },
    })
  }

  return (
    <div className="card user-list-card">
      <div className="card-header">
        <h3>User Management</h3>
      </div>

      {/* Delete Status Message */}
      {deleteStatusMessage && (
        <div
          className={`alert ${deleteStatusMessage.startsWith('✓') ? 'alert-success' : 'alert-danger'}`}
          role="status"
        >
          {deleteStatusMessage}
        </div>
      )}

      {/* Initial Loading */}
      {isPending && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading users...</p>
        </div>
      )}

      {/* Fetch Error */}
      {isError && (
        <div className="alert alert-danger" role="alert">
          Failed to load users: {error?.message}
        </div>
      )}

      {/* Users Table */}
      {!isPending && users && (
        <>
          {users.length === 0 ? (
            <div className="empty-state">
              <p>No users found. Use the form to add one.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="user-id">#{user.id}</td>
                      <td className="user-name">
                        <strong>{user.name}</strong>
                      </td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className={`role-pill role-${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
                          onClick={() => handleDelete(user.id, user.name)}
                          disabled={isDeleting && deletingId === user.id}
                        >
                          {isDeleting && deletingId === user.id ? (
                            <>
                              <span className="mini-spinner" /> Deleting...
                            </>
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <div className="list-footer">
        <span className="footer-count">
          Total Users: <strong>{users?.length || 0}</strong>
        </span>
        {isFetching && (
          <span className="syncing-text">
            <span className="mini-spinner" /> Updating...
          </span>
        )}
      </div>
    </div>
  )
}
