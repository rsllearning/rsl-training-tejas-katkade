import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/usersApi'

/**
 * Custom hook to fetch users using TanStack Query
 * Query key: ['users']
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
