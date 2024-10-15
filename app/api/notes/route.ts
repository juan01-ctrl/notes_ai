import { NextRequest } from "next/server";
import { createNoteSchema } from "./validation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { getEmbeddingForNote } from "@/lib/openai";
import { index } from "@/lib/pinecone";

export async function POST (req: NextRequest) {
    try {
        const body = await req.json()

        const parseResult = createNoteSchema.safeParse({ body })

        if (!parseResult.success) {
            return Response.json({ error: parseResult }, { status: 400 })
        }

        const { title, content } = parseResult.data.body

        const { userId } = auth()

        if (!userId) {
            return Response.json({ error: 'Unauthorized'}, { status: 401 })
        }
        
        const embedding = await getEmbeddingForNote(title, content)

        const note = await prisma.$transaction(async (tx) => {
            const note = await tx.note.create({
                data: {
                    title,
                    content,
                    userId
                }
            })

            await index.upsert([{
                id: note.id,
                values: embedding,
                metadata: {userId}
            }])

            return note
        })

        return Response.json(note, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal server error'}, { status: 500 })
    }
}