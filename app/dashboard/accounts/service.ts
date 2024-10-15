import { GetNotesByAccountResponse, GetNotesByAccountSchema } from "@/app/api/accounts/types"
import httpClient from "@/lib/http-client"

const client = httpClient('/api/accounts')

export const getNotes = async ({ 
    params: { id }
 }: GetNotesByAccountSchema): Promise<GetNotesByAccountResponse> => client.get(`/${id}/notes`)
