import { openai }                             from '@ai-sdk/openai'
import { auth }                               from "@clerk/nextjs/server"
import {  convertToCoreMessages, streamText } from "ai"
import { ChatCompletionMessage }              from "openai/resources/index.mjs"

import prisma            from "@/lib/db"
import { getEmbeddings } from "@/lib/openai"
import { index }         from "@/lib/pinecone"



export async function POST(req: Request) {
  try {
    const body = await req.json()

    const messages: ChatCompletionMessage[] = body.messages
        
        
    const messagesTruncated = messages.slice(-6).map((msg) => ({
      ...msg,
      content: msg.content || "", // Ensure content is not null
    }));

    const embedding = await getEmbeddings(
      messagesTruncated.map((message) => message.content).join("\n")
    )

    const { userId } = auth()

    const vectorQuery = await index.query({
      topK: 1,
      vector: embedding,
      filter: { userId }
      // includeMetadata: true
    })

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: { in: vectorQuery.matches.map((match) => match.id) }
      }
    })


    const systemMessage: ChatCompletionMessage & { content: string } = {
      role: "assistant",
      refusal: null,
      content: "You are a helpful AI assistant that can answer questions and help with tasks. You have access to the following notes for answering questions: " +
            relevantNotes
              .map((note) => `Title: ${note.title}\n\nContent:\n${note.content || ""}`) // Ensure content is not null
              .join("\n\n---\n\n")
    }

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant.',
      messages: convertToCoreMessages([systemMessage, ...messagesTruncated]),
    });

    return result.toDataStreamResponse()
  } catch (error) {
    console.log("CHAT_ERROR", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}