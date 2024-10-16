import { useMutation, useQueryClient } from "@tanstack/react-query";

import { refetchNotes } from "@/app/dashboard/accounts/hooks/use-get-notes";
import { useToast }     from "@/hooks/use-toast"

import { createNote } from "../service";

export const useCreateNote = (onSuccess?: () => void) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNote,
    onError: () => {
      toast({
        title: 'Something went wrong',
        variant: 'destructive'
      })
    },
    onSuccess: () => {
      refetchNotes(queryClient)
      toast({
        title: 'Note created successfully',
      })
      onSuccess?.()
    }
  })
}
