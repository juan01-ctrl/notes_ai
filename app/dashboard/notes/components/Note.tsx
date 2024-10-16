import { Note as INote } from "@prisma/client"
import dayjs             from "dayjs"
import { useState }      from "react"

import ResponsiveModal                              from "@/components/ResponsiveModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DialogDescription
} from "@/components/ui/dialog"

import DeleteNoteAction from "./DeleteNoteAction"
import EditNoteAction   from "./EditNoteAction"


interface Props {
    note: INote
}

const initialOpenState = {
  note: false,
  edit: false,
  delete: false
}

function Note({ note }: Props) {
  const [open, setOpen] = useState(initialOpenState)

  const date = dayjs(note.updatedAt || note.createdAt).format('DD [de] MMMM [de] YYYY')

  const handleOpen = (key: keyof typeof open, state = true) => {
    if (key === 'note' && (open.delete || open.edit)) {
      return
    }
    setOpen({ ...initialOpenState, [key]: state })
  }

  return (
    <>
      <Card onClick={() => setOpen({ ...initialOpenState, note: true })} className="cursor-pointer">
        <CardHeader className="py-4">
          <div className="flex justify-between items-center gap-2">
            <CardTitle>{note.title}</CardTitle>
            <div className="flex gap-2">
              <DeleteNoteAction
                toggleOpen={(state?: boolean) => handleOpen('delete', state)}
                isOpen={open.delete}
                id={note.id}
              />
              <EditNoteAction
                toggleOpen={(state?: boolean) => handleOpen('edit', state)}
                isOpen={open.edit}
                note={note}
              />
            </div>
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">
            {
              (note?.content?.length || 0) > 50
                ? `${note.content?.substring(0, 50)} ...`
                : note.content}
          </p>
        </CardContent>
      </Card>
      <ResponsiveModal
        open={open.note}
        setOpen={(state) => handleOpen('note', state)} title={note.title} Content={
          <DialogDescription>
            <p className="whitespace-pre-line text-primary">
              {note.content}
            </p>
          </DialogDescription>
        }
      />
    </>
  )
}

export default Note
