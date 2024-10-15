import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { Button } from "./ui/button"
import { Trash, Trash2, XCircle } from "lucide-react"
import { Input } from "./ui/input"
import ChatMessage from "./ChatMessage"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Props {
    open: boolean
    onClose: () => void
}

function AIChatBot({ open, onClose }: Props) {
    const { theme } = useTheme()
    const {
        messages,
        input,
        error,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading
    } = useChat()

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    const lastMessageIsUser = messages.at(-1)?.role === 'user'

    return (
        <div className={cn(
            "fixed z-10 bottom-0 right-0 p-2 w-full max-w-[500px] xl:right-36",
            open ? "visible" : "hidden"
        )}>
            <div onClick={onClose} className="flex items-center justify-end cursor-pointer mb-1 ms-auto">
                <XCircle size={24} />
            </div>
            <div className="flex flex-col h-[400px] overflow-y-auto bg-background p-4 rounded-lg" style={{
                boxShadow: `0 0 ${theme === 'dark' ? '10px 3px' : '2px 0'} #00000070`
            }}>
                <div className="h-full overflow-y-auto py-2" ref={scrollRef}>
                    {
                        messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))
                    }
                    {
                        isLoading && lastMessageIsUser && (
                            <ChatMessage message={{
                                role: 'assistant',
                                content: 'Thinking...',
                            }} />
                        )
                    }
                    {
                        error && (
                            <ChatMessage message={{
                                role: 'assistant',
                                content: 'Something went wrong, please try again.',
                            }} />
                        )
                    }
                    {
                        !error && messages.length === 0 && (
                            <ChatMessage message={{
                                role: 'assistant',
                                content: 'Hi, I am your AI assistant. How can I help you?',
                            }} />
                        )
                    }
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask anything..."
                    />
                    <Button type="submit" disabled={isLoading}>
                        Send
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setMessages([])}
                        variant='outline'
                    >
                        <Trash size={20} />
                    </Button>
                </form>
                {/* {messages.map((message) => (
                    <div key={message.id}>{message.role}: {message.content}</div>
                ))} */}
            </div>
        </div>
    )
}


export default AIChatBot