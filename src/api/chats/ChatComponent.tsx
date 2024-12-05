import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Send } from "lucide-react";
import MessageList from "./MessageList";

import { useChatProvider } from "@/contexts/chat-context";

export default function ChatComponent() {
  const { handleInputChange, handleSubmit, input, isLoading, messages } =
    useChatProvider();
  return (
    <div className="relative flex flex-col h-full max-h-screen overflow-y-auto">
      <div className="sticky top-0 inset-x-0 bg-white h-fit">
        <h3 className="text-xl font-bold p-2">Chat</h3>
      </div>
      <div className="flex-1 py-2">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <form onSubmit={handleSubmit} className="flex sticky bottom-0">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask any question..."
          className="w-full rounded-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
        />
        <Button className="bg-gray-800 rounded-none">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
