import { useCreateChat } from "@/api/chats/useCreateChat";
import { useCustomAuth } from "@/contexts/auth-context";
import { Inbox } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Socket, io } from "socket.io-client";

export default function FileUpload() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [progress, setProgress] = useState(0);
  const { mutate: createChat } = useCreateChat();
  const { userId } = useCustomAuth();

  // Initialize Socket.IO connection
  useEffect(
    function () {
      const socketInstance = io("http://localhost:3001"); // Replace with your backend URL
      if (userId) {
        setSocket(socketInstance);

        socketInstance.on("connect", function () {
          console.log("Connected to server:", socketInstance.id);
        });

        socketInstance.on("upload-progress", (data: { progress: number }) => {
          console.log("Progress received:", data.progress);
          setProgress(data.progress);
        });

        socketInstance.on("upload-complete", () => {
          console.log("Upload complete!");
        });

        socketInstance.on("upload-error", (data: { message: string }) => {
          console.error("Upload error:", data.message);
        });
        socketInstance.on("disconnect", function () {
          console.log("disconnected server from server");
        });
      } else {
        socketInstance.disconnect();
        setSocket(null);
      }

      return () => {
        // Cleanup on unmount
        socketInstance.disconnect();
        setSocket(null);
      };
    },
    [userId]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      createChat({
        file: acceptedFiles[0],
        socketId: socket?.id || "",
      });
      //uploadFile(acceptedFiles[0], socket?.id || "");
    },
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDropRejected: () => {
      console.log("");
    },
  });
  return (
    <div className="bg-white  p-2 flex items-center rounded-md justify-center">
      <div
        {...getRootProps()}
        className="flex gap-2 cursor-pointer flex-col items-center rounded-md border-[3px] border-dashed border-gray-400 justify-center py-8 w-full bg-[#e0dee0] "
      >
        <Inbox className="text-blue-800 w-8 h-8" />
        <div className="text-sm text-gray-600 font-semibold">Drop PDF Here</div>
      </div>
      <input {...getInputProps()} />
    </div>
  );
}
