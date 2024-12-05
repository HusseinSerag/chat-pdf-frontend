import { useQuery } from "@tanstack/react-query";
import { getMessages } from "./messages.api";

interface Props {
  id: number;
}
export function useGetMessage({ id }: Props) {
  const { data, isPending } = useQuery({
    queryFn: () => getMessages(id),
    queryKey: ["messages", id],
  });

  return {
    initialMessages: data,
    isLoading: isPending,
  };
}
