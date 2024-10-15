import { z } from "zod";

export const createNoteSchema = z.object({
    body: z.object({
        title: z.string().min(1, { message: "Title is required" }),
        content: z.string().optional()
})
}).strict()


export const deleteNoteSchema = z.object({
    params: z.object({
       id: z.string()
    })
}).strict()


export const updateNoteSchema = z.object({
    body: z.object({
        title: z.string().min(1, { message: "Title is required" }),
        content: z.string().optional()
    }),
    params: z.object({
       id: z.string()
    })
}).strict()


