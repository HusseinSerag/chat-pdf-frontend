import { cn } from "@/lib/utils";
import { Message } from "ai/react";

interface MessageListProps {
    messages: Message[]
}
export default function MessageList({messages}:MessageListProps){
    if(!messages) return<></>
    return <div className="flex flex-col gap-2 px-4">
        {
            messages.map(message => {
                return <div className={cn('flex',{
                    'justify-end pl-10':message.role === 'user',
                    'justify-start pr-10':message.role === 'assistant'
                })} key={message.id} >
                        <div className={cn(
                            'rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10',{
                                'bg-slate-800 text-white': message.role === 'user'
                            }
                        )}>
                            <p>{message.content}</p>
                        </div>
                </div>
            })
        }
    </div>
}