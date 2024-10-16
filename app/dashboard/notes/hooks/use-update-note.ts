import { useMutation, useQueryClient } from "@tanstack/react-query"

import { refetchNotes } from "@/app/dashboard/accounts/hooks/use-get-notes"
import { updateNote }   from "@/app/dashboard/notes/service"

export const useUpdateNote = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      refetchNotes(queryClient)
      onSuccess?.()
    }
  })
}       