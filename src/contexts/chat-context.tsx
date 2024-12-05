import { Messages } from "@/api/messages/messages.api";
import { useGetMessage } from "@/api/messages/useGetMessage";
import { Message, useChat } from "ai/react";
import { ReactNode, createContext, useContext, useEffect } from "react";

interface ChatContextValues {
  messages: Message[];
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  input: string;
  isLoading: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: any | undefined
  ) => void;
}
const Context = createContext<ChatContextValues>({} as ChatContextValues);

interface ChatProviderProps {
  fileKey: string;
  chatId: number;
  children: ReactNode;
  initialMessages: Messages[];
}
export function ChatProvider({
  chatId,
  children,
  fileKey,
  initialMessages,
}: ChatProviderProps) {
  console.log(initialMessages);
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    setMessages,
  } = useChat({
    api: `${import.meta.env.VITE_BACKEND_URL}api/chats/generate`,
    credentials: "include",
    body: {
      fileKey,
      chatId,
    },
  });
  useEffect(
    function () {
      setMessages(initialMessages as any);
    },
    [chatId]
  );
  return (
    <Context.Provider
      value={{
        handleInputChange,
        handleSubmit,
        input,
        isLoading,
        messages,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useChatProvider() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Cannot use useChatProvider outside of the Chat Provider");
  }
  return context;
}
