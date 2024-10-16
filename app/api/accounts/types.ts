import { Note } from "@prisma/client";
import { z }    from "zod";

import { getNotesByAccountSchema } from "./validations";

export type GetNotesByAccountSchema = z.infer<typeof getNotesByAccountSchema>;
export type GetNotesByAccountResponse = Note[]