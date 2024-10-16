'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState }    from 'react'
import { useForm }     from 'react-hook-form'

import { CreateNoteSchema } from '@/app/api/notes/types'
import { createNoteSchema } from '@/app/api/notes/validation'
import { Button }           from '@/components/ui/button'
import {
  DialogTrigger
} from '@/components/ui/dialog'



import { useCreateNote } from '../hooks/use-create-note'


import MutateNoteModal from './MutateNoteModal'

function CreateNoteAction() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateNoteSchema['body']>({
    resolver: zodResolver(createNoteSchema.shape.body),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const { mutate: createNote, isPending } = useCreateNote(() => {
    form.reset()
    setOpen(false)
  })

  const onSubmit = async (body: CreateNoteSchema['body']) => {
    createNote({ body })
  }

  return (
    <MutateNoteModal key='create' submitHandler={onSubmit} isLoading={isPending} open={open} setOpen={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}> Add note</Button>
      </DialogTrigger>
    </MutateNoteModal>
  )
}

export default CreateNoteAction
