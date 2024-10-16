'use client'

import { Loader2 } from 'lucide-react'

import { useGetNotes } from '@/app/dashboard/accounts/hooks/use-get-notes'

import Note from './Note'

interface Props {
    userId: string
}

function NoteList({ userId }: Props) {
  const { data: notes, isLoading } = useGetNotes({ params: { id: userId } })

  if (isLoading) return <div className="flex pt-10 justify-center items-center h-full">
    <Loader2 className="animate-spin" />
  </div>

  return (
    <div className="flex flex-col grow w-full py-6">
      {
        !notes?.length
          ? <div className="flex grow items-center justify-center h-full">
            <span>
                            You don&apos;t have any notes yet.
              <b>
                                Create your first note to start organizing your plans and ideas!
              </b>
            </span>
          </div>
          : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              notes.map((note) => (
                <Note key={note.id} note={note} />
              ))
            }
          </div>
      }
    </div>
  )
}

export default NoteList