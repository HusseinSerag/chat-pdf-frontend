import ChatMainBody from "@/api/chats/ChatMainScreen";
import { useGetAllChats } from "@/api/chats/useGetAllChats";
import ChatSidebar from "@/components/ui/chatSidebar";
import { LoadingSpinner } from "@/components/ui/loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import LoadChat from "@/layouts/load-chat";
import { useParams } from "react-router";

export default function Chat() {
  const { id } = useParams<{ id?: string }>();
  const {
    fetchNextPage,
    hasNextPage,
    chatsToView,
    isError,
    isPending: isLoadingChats,
    refetch,
    isFetchingNextPage,
  } = useGetAllChats();

  const isLoading = isLoadingChats;

  function refetchAllChatsOnError() {
    if (isError) refetch();
  }
  function fetchNextChats() {
    if (hasNextPage) fetchNextPage();
  }

  if (isLoading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      <div className="h-full max-h-screen flex">
        <div className="">
          <SidebarProvider>
            <ChatSidebar
              chatId={id ? parseInt(id) : undefined}
              isFetchingNextPage={isFetchingNextPage}
              isLoadingChats={isLoadingChats}
              isError={isError}
              fetchNextChats={fetchNextChats}
              refetchAllChatsOnError={refetchAllChatsOnError}
              chats={chatsToView ?? []}
              hasNextPage={hasNextPage}
            />
          </SidebarProvider>
        </div>
        <LoadChat>
          <ChatMainBody />
        </LoadChat>
      </div>
    </>
  );
}
