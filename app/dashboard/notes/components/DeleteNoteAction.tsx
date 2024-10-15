import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDeleteNote } from "@/app/dashboard/notes/hooks/use-delete-note"
import ResponsiveModal from "@/components/ResponsiveModal"

interface Props {
    id: string
    isOpen: boolean
    toggleOpen: (state?: boolean) => void
}

function DeleteNoteAction({ id, isOpen, toggleOpen }: Props) {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <ResponsiveModal
                open={isOpen}
                setOpen={toggleOpen}
                title="Delete note"
                Content={<ModalContent toggleOpen={toggleOpen} id={id} />}
            >
                <DialogTrigger asChild>
                    <Trash2 onClick={() => toggleOpen()} className="w-4 h-4 cursor-pointer" />
                </DialogTrigger>
            </ResponsiveModal>
        </div>
    )
}

export default DeleteNoteAction


function ModalContent({ toggleOpen, id }: Pick<Props, 'toggleOpen' | 'id'>) {
    const { mutate: deleteNote } = useDeleteNote()

    const handleDeleteNote = async (id: string) => {
        deleteNote({ params: { id } })
    }
    return (
        <>
            <DialogDescription>
                Are you sure you want to delete this note?
            </DialogDescription>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => toggleOpen(false)}>Cancel</Button>
                <Button onClick={() => handleDeleteNote(id)}>Delete</Button>
            </div>
        </>
    )
}
