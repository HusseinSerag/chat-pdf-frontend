import { useMutation } from "@tanstack/react-query";
import { createChat } from "./chat.api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useCreateChat() {
  const { isPending, data, error, mutate } = useMutation({
    mutationFn: ({ file, socketId }: { file: File; socketId: string }) =>
      createChat(file, socketId),
    onSuccess() {
      toast.success("Time to talk with the PDF!");
    },
    onError(e: Error | AxiosError) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message);
      } else {
        toast.error(e.message);
      }
    },
  });
  return {
    isPending,
    data,
    error,
    mutate,
  };
}
