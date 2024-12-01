import { useCustomAuth } from "@/contexts/auth-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatsApi } from "./chat.api";

export function useGetAllChats() {
  const { userId } = useCustomAuth();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isError,
    isPending,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["chat", userId],

    queryFn: ({ pageParam }) => getChatsApi("createdAt", "asc", pageParam, 5),
    initialPageParam: 0,

    getNextPageParam: (lastPage, _, pageParam) => {
      if (lastPage.length < 5) {
        return null;
      }
      return pageParam + 1;
    },
  });
  const chatsToView = data?.pages.flat();
  return {
    chatsToView,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
    refetch,
    isFetchingNextPage,
  };
}
