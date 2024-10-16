import { z } from "zod";

export const getNotesByAccountSchema = z.object({
  params: z.object({
    id: z.string()
  })
})
