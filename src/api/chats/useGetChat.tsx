import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getSingleChatsApi } from "./chat.api";

export default function useGetChat() {
  const { id } = useParams<{
    id?: string;
  }>();

  return useQuery({
    queryKey: ["chats", id || null],
    queryFn: () => getSingleChatsApi(id),
  });
}
