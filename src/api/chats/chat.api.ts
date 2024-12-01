import axiosInstance from "../axios";
import * as z from "zod";
export async function createChat(file: File, socketId: string) {
  const formData = new FormData();
  formData.append("pdf", file);
  try {
    const res = await axiosInstance.post<{
      data: {
        chatId: string;
      };
    }>("api/chats", formData, {
      headers: {
        "socket-id": socketId,
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    throw e;
  }
}

const chatApi = z.object({
  createdAt: z.string(),
  id: z.coerce.number(),
  pdfName: z.string(),
  pdfURL: z.string(),
});
const getChatsApiType = z.object({
  data: z.object({
    chats: chatApi.array(),
  }),
});
const CurrentChat = z.object({
  createdAt: z.string(),
  id: z.coerce.number(),
  pdfName: z.string(),
  pdfURL: z.string(),
  userId: z.string(),
  fileKey: z.string(),
});
const getChat = z.object({
  data: z.object({
    chat: CurrentChat.array(),
  }),
});
export type Chat = z.infer<typeof chatApi>;

export async function getChatsApi(
  sort: string,
  direction: "asc" | "desc",
  page: number,
  offset: number
) {
  try {
    const res = await axiosInstance.get(
      `api/chats?sort=${sort}&direction=${direction}&page=${page}&offset=${offset}`
    );

    const data = getChatsApiType.parse(res.data);
    return data.data.chats;
  } catch (e) {
    throw e;
  }
}

export async function getSingleChatsApi(chatId?: string) {
  if (!chatId) return null;
  try {
    const res = await axiosInstance.get(`api/chats/${chatId}`);
    const data = getChat.parse(res.data);
    return data.data.chat[0];
  } catch (e) {
    throw e;
  }
}
