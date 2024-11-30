import { useCustomAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";

export function useProgressSocketIO() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [progress, setProgress] = useState(0);
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

        socketInstance.on("upload-progress", (data: { progress: string }) => {
          console.log("Progress received:", parseInt(data.progress));
          setProgress(parseInt(data.progress));
        });

        socketInstance.on("upload-complete", () => {
          toast.success("Upload complete, please give us a few seconds!");
        });

        socketInstance.on("upload-error", (data: { message: string }) => {
          toast.error(data.message);
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
  return {
    progress,
    socket,
  };
}
