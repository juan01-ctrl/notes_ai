import { useUser } from "@clerk/nextjs"
import { Message } from "ai"
import { Bot }     from "lucide-react"
import Image       from "next/image"

import { cn } from "@/lib/utils"

interface Props {
    message: Pick<Message, 'role' | 'content'>
}

function ChatMessage({ message }: Props) {
  const { user } = useUser()

  const { role, content } = message
  const isUser = role === "user"


  return (
    <div className={
      cn(
        "mb-3 flex items-center",
        isUser ? "ms-5 justify-end" : "me-5 justify-start"
      )
    }>
      {!isUser && <Bot className="mr-2" />}
      <span className={cn(
        "whitespace-pre-line rounded-md border px-3 py-2",
        isUser ? "bg-primary text-primary-foreground" : "bg-background"
      )}>{content}</span>
      {
        isUser && <Image
          src={user!.imageUrl}
          alt="user image"
          width={24}
          height={24}
          className="ml-2 rounded-full w-10 h-10 object-cover"
        />
      }
    </div>
  )
}

export default ChatMessage
