import { CreateNoteResponse, DeleteNoteResponse, DeleteNoteSchema, UpdateNoteResponse, UpdateNoteSchema } from "@/app/api/notes/types"
import { CreateNoteSchema } from "@/app/api/notes/types"
import httpClient  from "@/lib/http-client"

const client = httpClient('/api/notes')

export const createNote = async ({ 
    body
}: CreateNoteSchema): Promise<CreateNoteResponse> =>  client
.post('/', body)

export const deleteNote = async ({ 
    params: { id }
}: DeleteNoteSchema): Promise<DeleteNoteResponse> => client.delete(`/${id}`)


export const updateNote = async ({ 
    params: { id },
    body
}: UpdateNoteSchema): Promise<UpdateNoteResponse> => client.put(`/${id}`, body)

