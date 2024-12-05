import axiosInstance from "../axios";
import * as z from "zod";

const MessageZod = z.object({
  id: z.number(),
  createdAt: z.string(),
  chatId: z.number(),
  content: z.string(),
  role: z.union([z.literal("user"), z.literal("system")]),
});
export type Messages = z.infer<typeof MessageZod>;
export async function getMessages(chatId: number) {
  if (!chatId) return [] as Messages[];
  try {
    const res = await axiosInstance.get(`api/messages/${chatId}`);
    const data = z
      .object({
        data: z.object({
          messages: MessageZod.array(),
        }),
      })
      .parse(res.data);
    console.log(data);
    return data.data.messages;
  } catch (e) {
    throw e;
  }
}
