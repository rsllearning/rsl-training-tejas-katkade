// In-memory persistent server simulation for users API
let serverUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice.smith@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie Davis', email: 'charlie.d@example.com', role: 'Viewer' },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', role: 'User' },
]

let nextId = 5

/**
 * Fetch all users from server
 */
export async function fetchUsers() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...serverUsers]
}

/**
 * Create a new user on server
 */
export async function createUser(userData) {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (!userData.name?.trim() || !userData.email?.trim()) {
    throw new Error('Name and email are required.')
  }

  const newUser = {
    id: nextId++,
    name: userData.name.trim(),
    email: userData.email.trim(),
    role: userData.role || 'User',
  }

  serverUsers.push(newUser)
  return newUser
}

/**
 * Delete a user on server
 */
export async function deleteUser(userId) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  serverUsers = serverUsers.filter((u) => u.id !== userId)
  return { success: true, deletedId: userId }
}
