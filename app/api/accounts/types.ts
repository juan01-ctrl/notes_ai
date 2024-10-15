import { getNotesByAccountSchema } from "./validations";
import { z } from "zod";
import { Note } from "@prisma/client";

export type GetNotesByAccountSchema = z.infer<typeof getNotesByAccountSchema>;
export type GetNotesByAccountResponse = Note[]