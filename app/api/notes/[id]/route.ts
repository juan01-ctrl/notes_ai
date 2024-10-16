import { NextRequest, NextResponse } from "next/server"

import { runMiddlewares }      from "@/app/middlewares"
import { requireAuth }         from "@/app/middlewares/requireAuth"
import { validateRequest }     from "@/app/middlewares/validateRequest"
import prisma                  from "@/lib/db"
import { getEmbeddingForNote } from "@/lib/openai"
import { index }               from "@/lib/pinecone"

import { DeleteNoteSchema, UpdateNoteSchema } from "../types"
import { deleteNoteSchema, updateNoteSchema } from "../validation"





export const DELETE = async (req: NextRequest, { params }: DeleteNoteSchema) => {
  try {
    const middlewareResult = await runMiddlewares<[string, DeleteNoteSchema]>([
      () => requireAuth(),
      () => validateRequest(req, params, deleteNoteSchema)
    ], req);

    if (middlewareResult instanceof NextResponse) {
      return middlewareResult; 
    }

    const validatedData = middlewareResult[1]
 
    
    const { id } = validatedData.params

     
    const note = await prisma.$transaction(async (tx) => {
      const deletedNote = await tx.note.delete({ where: { id } })
      await index.deleteOne(id)

      return deletedNote
    })
 

    return NextResponse.json(note, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

 
export const PUT = async (req: NextRequest, { params }: Pick<UpdateNoteSchema, 'params'>) => {
  try {
    const middlewareResult = await runMiddlewares<[string, UpdateNoteSchema]>([
      () => requireAuth(),
      () => validateRequest(req, params, updateNoteSchema)
    ], req);

    if (middlewareResult instanceof NextResponse) {
      return middlewareResult; 
    }

    const [userId, validatedData] = middlewareResult


    const { id } = validatedData.params
    const { title, content } = validatedData.body
        

    const embedding = await getEmbeddingForNote(title, content)

    const note = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: { id },
        data: validatedData.body
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
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
 
