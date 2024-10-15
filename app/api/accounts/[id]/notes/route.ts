import { NextRequest, NextResponse } from "next/server"
import { GetNotesByAccountSchema } from "../../types"
import { getNotesByAccountSchema } from "../../validations"

import prisma from "@/lib/db"

export const GET = async (_req: NextRequest, { params }: GetNotesByAccountSchema) => {
    try {
     const parseResult = getNotesByAccountSchema.safeParse({ params })
 
    
     if (!parseResult.success) {
         return Response.json({ error: parseResult }, { status: 400 })
     }
 
     const { id } = parseResult.data.params
 
     const notes = await prisma.note.findMany({
         where: { userId: id }
     })

        
     return NextResponse.json(notes, { status: 200 })
    } catch (error) {
        return NextResponse.json({
          error: 'Failed to fetch notes'
         }, { status: 500 })
    }
 }