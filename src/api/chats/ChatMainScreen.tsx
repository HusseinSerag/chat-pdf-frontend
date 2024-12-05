import PDFViewer from "@/components/ui/PDFViewer";
import useGetChat from "./useGetChat";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ChatComponent from "./ChatComponent";
import { MessageCircle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { ChatProvider } from "@/contexts/chat-context";
import { useGetMessage } from "../messages/useGetMessage";
import { LoadingSpinner } from "@/components/ui/loader";

export default function ChatMainBody() {
  const { data } = useGetChat();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateModalState = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsOpen(event.matches);
    };

    updateModalState(mediaQuery);

    mediaQuery.addEventListener("change", updateModalState);

    return () => {
      mediaQuery.removeEventListener("change", updateModalState);
    };
  }, []);
  const { initialMessages, isLoading: isLoadingAllMessages } = useGetMessage({
    id: data?.id || 0,
  });
  if (!data) {
    return (
      <div className="flex-1 h-screen  w-full flex flex-col gap-2 items-center justify-center">
        <h1 className="font-semibold">No chats yet?</h1>
        <Button>
          <Link to={"/"}>Get Started now!</Link>
        </Button>
      </div>
    );
  }

  if (isLoadingAllMessages || !initialMessages)
    return (
      <div className="min-h-full w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
        <LoadingSpinner />
      </div>
    );

  return (
    <ChatProvider
      chatId={data.id}
      fileKey={data.fileKey}
      initialMessages={initialMessages}
    >
      <div className="flex-[5] flex flex-col min-h-screen p-4 ">
        <h1 className="md:stext-2xl text-center text-wrap text-sm sm:text-xl  font-semibold">
          {data.pdfName}
        </h1>
        <PDFViewer pdf_url={data.pdfURL} />
      </div>

      <div
        className={`flex-[3] hidden md:block border-l-4 border-l-slate-400  `}
      >
        <ChatComponent />
      </div>

      {isOpen && (
        <Drawer>
          <DrawerTrigger>
            <div className="absolute bg-white cursor-pointer p-2 shadow-sm shadow-black flex items-center justify-center rounded-full   z-10 bottom-3 right-3 md:hidden">
              {" "}
              <MessageCircle />
            </div>
          </DrawerTrigger>
          <DrawerContent className="max-h-[300px] overflow-hidden">
            <ChatComponent />
            <DrawerClose></DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </ChatProvider>
  );
}
