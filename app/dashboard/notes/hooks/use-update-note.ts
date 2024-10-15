import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateNote } from "@/app/dashboard/notes/service"
import { refetchNotes } from "@/app/dashboard/accounts/hooks/use-get-notes"

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