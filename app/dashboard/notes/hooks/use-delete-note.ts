import { useMutation, useQueryClient } from "@tanstack/react-query"

import { refetchNotes } from "@/app/dashboard/accounts/hooks/use-get-notes"
import { deleteNote }   from "@/app/dashboard/notes/service"
import { useToast }     from "@/hooks/use-toast"

export const useDeleteNote = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast({
        title: 'Nota eliminada correctamente'
      })
      refetchNotes(queryClient)
    }
  })
}   