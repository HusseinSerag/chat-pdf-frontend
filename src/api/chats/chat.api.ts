import axiosInstance from "../axios";

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
