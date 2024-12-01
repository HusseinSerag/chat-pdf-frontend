import { Chat } from "@/api/chats/chat.api";
import { Home, MessageCircle, PlusCircleIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";
import { Button } from "./button";
import { LoadingSpinner } from "./loader";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  chats: Chat[];
  fetchNextChats(): void;
  refetchAllChatsOnError(): void;
  isError: boolean;
  isLoadingChats: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  chatId: number | undefined;
}

export default function ChatSidebar({
  chats,
  refetchAllChatsOnError,
  fetchNextChats,
  isError,
  isLoadingChats,
  isFetchingNextPage,
  hasNextPage,
  chatId,
}: ChatSidebarProps) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  useEffect(
    function () {
      if (state === "expanded" && !isMobile) {
        setOpenMobile(false);
      }
    },
    [state, isMobile]
  );
  const navigate = useNavigate();
  return (
    <>
      <Sidebar>
        <SidebarHeader className="bg-gray-900 px-2 py-4">
          <Link to={"/"}>
            <Button className="w-full flex items-center border-dashed border-2 border-white justify-center">
              <PlusCircleIcon />
              <div>New Chat</div>
            </Button>
          </Link>
        </SidebarHeader>
        <SidebarContent className="bg-gray-900 text-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col">
                {chats.map((item) => (
                  <SidebarMenuItem
                    className={cn(
                      "w-full text-nowrap overflow-hidden px-1 py-2 flex items-center gap-1 text-ellipsis",
                      chatId == item.id && " bg-blue-800 rounded-lg"
                    )}
                    key={item.id}
                  >
                    <MessageCircle className=" h-4" />
                    <div
                      className={cn(
                        "overflow-hidden text-ellipsis hover:text-gray-400",
                        chatId == item.id && "hover:text-gray-300"
                      )}
                      onClick={() => {
                        setOpenMobile(false);
                        navigate(`/chat/${item.id}`);
                      }}
                    >
                      {item.pdfName}
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <div className="flex items-center justify-center">
                {hasNextPage && !isFetchingNextPage && (
                  <Button
                    onClick={fetchNextChats}
                    className="mt-2"
                    variant={"ghost"}
                  >
                    Load More...
                  </Button>
                )}
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-900 border-t-2 border-t-white text-white flex items-center flex-col justify-center">
          <Link className="flex gap-2" to={"/"}>
            <Home />
            <div>Home</div>
          </Link>
        </SidebarFooter>
      </Sidebar>
      {isMobile && <SidebarTrigger />}
    </>
  );
}
