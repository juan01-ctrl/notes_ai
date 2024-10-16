import { Note } from "@prisma/client";
import { z }    from "zod";

import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "./validation";

export type CreateNoteSchema = z.infer<typeof createNoteSchema>
export type CreateNoteResponse = Note


export type DeleteNoteSchema = z.infer<typeof deleteNoteSchema>
export type DeleteNoteResponse = Note

export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>
export type UpdateNoteResponse = Note
