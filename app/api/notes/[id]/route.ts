import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { DeleteNoteSchema, UpdateNoteSchema } from "../types"
import { deleteNoteSchema, updateNoteSchema } from "../validation"
import { index } from "@/lib/pinecone"
import { auth } from "@clerk/nextjs/server"
import { getEmbeddingForNote } from "@/lib/openai"


export const DELETE = async (_req: NextRequest, { params }: DeleteNoteSchema) => {
    try {
     const parseResult = deleteNoteSchema.safeParse({ params })
 
    
     if (!parseResult.success) {
         return Response.json({ error: parseResult }, { status: 400 })
     }
 
     const { id } = parseResult.data.params

     
     const note = await prisma.$transaction(async (tx) => {
        const deletedNote = await tx.note.delete({ where: { id } })
        await index.deleteOne(id)

        return deletedNote
     })
 

     return NextResponse.json(note, { status: 200 })
    } catch (error) {
        return NextResponse.json({
          error: 'Failed to delete note'
         }, { status: 500 })
    }
 }

 
 export const PUT = async (_req: NextRequest, { params }: Pick<UpdateNoteSchema, 'params'>) => {
    try {
        const { userId } = auth()
        const body = await _req.json()
        const parseResult = updateNoteSchema.safeParse({ params, body })
 
    
        if (!userId) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!parseResult.success) {
             return Response.json({ error: parseResult }, { status: 400 })
        }
 
        const { id } = parseResult.data.params

        const { title, content } = parseResult.data.body
        

        const embedding = await getEmbeddingForNote(title, content)

        const note = await prisma.$transaction(async (tx) => {
            const updatedNote = await tx.note.update({
                where: { id },
                data: parseResult.data.body
            })

            await index.upsert([{
                id,
                values: embedding,
                metadata: { userId }
            }])

            return updatedNote
        })
        
        return NextResponse.json(note, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
 }
 
