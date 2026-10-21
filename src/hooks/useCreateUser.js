import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api/usersApi'

/**
 * Custom hook to create a user using useMutation()
 * On success: invalidates ['users'] query so latest data is fetched
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate the ['users'] query to automatically refresh user list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
