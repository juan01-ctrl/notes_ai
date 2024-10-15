import { useState } from "react"
import AIChatBot from "./AIChatBot"
import { Bot } from "lucide-react"
import { Button } from "./ui/button"

function AIChatButton() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button onClick={() => setOpen((prev) => !prev)}>
                <Bot className="w-4 h-4 mr-2" />
                AI Chat
            </Button>
            <AIChatBot open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default AIChatButton
