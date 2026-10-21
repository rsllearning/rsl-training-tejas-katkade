import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '../api/usersApi'

/**
 * Custom hook to delete a user with Optimistic Updates:
 * 1. Cancels in-flight queries
 * 2. Snapshots previous users list
 * 3. Immediately updates cached ['users']
 * 4. Rolls back to snapshot if request fails
 * 5. Invalidates ['users'] query onSettled to synchronize with server
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId) => deleteUser(userId),

    onMutate: async (userId) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['users'] })

      // Snapshot previous users list
      const previousUsers = queryClient.getQueryData(['users'])

      // Optimistically update cache immediately
      queryClient.setQueryData(['users'], (oldUsers) => {
        if (!oldUsers) return []
        return oldUsers.filter((u) => u.id !== userId)
      })

      // Return context with snapshotted value
      return { previousUsers }
    },

    onError: (err, userId, context) => {
      // If mutation fails, restore previous cached data
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers)
      }
    },

    onSettled: () => {
      // Invalidate to synchronize cache with server state
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
