import { Note } from "@prisma/client"
import { Edit } from "lucide-react"

import { UpdateNoteSchema } from "@/app/api/notes/types"
import { useUpdateNote }    from "@/app/dashboard/notes/hooks/use-update-note"
import { DialogTrigger }    from "@/components/ui/dialog"

import MutateNoteModal from "./MutateNoteModal"

interface Props {
    note: Note
    isOpen: boolean
    toggleOpen: (state?: boolean) => void
}

function EditNoteAction({ note, isOpen, toggleOpen }: Props) {

  const { mutate: updateNote, isPending } = useUpdateNote(() => toggleOpen(false))

  const onSubmit = async (body: UpdateNoteSchema['body']) => {
    updateNote({ body, params: { id: note.id } })
  }

  return (
    <MutateNoteModal
      submitHandler={onSubmit}
      isLoading={isPending}
      open={isOpen}
      setOpen={toggleOpen}
      defaultValues={{
        title: note.title,
        content: note.content || ''
      }}
    >
      <DialogTrigger asChild >
        <Edit onClick={() => toggleOpen()} className="w-4 h-4 cursor-pointer" />
      </DialogTrigger >
    </MutateNoteModal>
  )
}

export default EditNoteAction
