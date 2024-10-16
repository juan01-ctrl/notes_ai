import { NextRequest, NextResponse } from "next/server"

import { GetNotesByAccountSchema } from "@/app/api/accounts/types"
import { getNotesByAccountSchema } from "@/app/api/accounts/validations"
import { runMiddlewares }          from "@/app/middlewares"
import { requireAuth }             from "@/app/middlewares/requireAuth"
import { validateRequest }         from "@/app/middlewares/validateRequest"
import prisma                      from "@/lib/db"



export const GET = async (req: NextRequest, { params }: GetNotesByAccountSchema) => {
  try {
    const middlewareResult = await runMiddlewares<[string, GetNotesByAccountSchema]>([
      () => requireAuth(),
      () => validateRequest(req, params, getNotesByAccountSchema)
    ], req);

    if (middlewareResult instanceof NextResponse) {
      return middlewareResult; 
    }

    const [userId] = middlewareResult
 
     
    const notes = await prisma.note.findMany({
      where: { userId }
    })

        
    return NextResponse.json(notes, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}