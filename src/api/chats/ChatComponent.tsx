import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from 'ai/react'
import { Send } from "lucide-react";
import MessageList from "./MessageList";

interface ChatsComponentsProps {
    fileKey: string;
}
export default function ChatComponent({fileKey}: ChatsComponentsProps){
    const {input, handleInputChange, handleSubmit, messages} = useChat({
        api:"http://localhost:3001/api/chats/generate",
        credentials:'include',
        body:{
            fileKey
        }
    })
    console.log(messages)
    return <div className="relative flex flex-col h-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 inset-x-0 bg-white h-fit">
            <h3 className="text-xl font-bold">Chat</h3>
        </div>
            <div className="flex-1">
               <MessageList messages={messages} />
            </div>
        
        <form onSubmit={handleSubmit} className="flex">
            <Input value={input} onChange={handleInputChange} placeholder="Ask any question..." className="w-full rounded-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0" />
            <Button className="bg-gray-800 rounded-none">
                <Send className="h-4 w-4" />
            </Button>
        </form>
    </div>
}