import { useCreateChat } from "@/api/chats/useCreateChat";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { Progress } from "@/components/ui/progress";
import { useCustomAuth } from "@/contexts/auth-context";
import { useProgressSocketIO } from "@/hooks/progress-socket";
import { UserButton } from "@clerk/clerk-react";

import { LogIn } from "lucide-react";

import { Link, useNavigate } from "react-router";

export default function Home() {
  const { userId } = useCustomAuth();
  const isAuthenticated = !!userId;
  const { progress, socket } = useProgressSocketIO();
  const { mutate: createChat, isPending } = useCreateChat();
  const navigate = useNavigate();
  function createChatProp(file: File) {
    createChat(
      {
        socketId: socket?.id || "",
        file,
      },
      {
        onSuccess: (data) => {
          navigate(`/chat/${data.data.chatId}`);
        },
      }
    );
  }
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute w-full max-w-[450px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <main className="flex flex-col items-center gap-2 text-center">
          <div className="flex  items-center justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Chat with any PDF
            </h1>
            <UserButton />
          </div>
          <div className="flex mt-2">
            {isAuthenticated && (
              <Link to={"/chat"}>
                <Button size={"sm"}>Go to Chats </Button>
              </Link>
            )}
          </div>
          <p className="max-w-[80%] text-sm sm:text-base text-balance text-slate-800">
            Join millions of students, researchers, and proffessionals to
            instantly answer questions and understand research with AI
          </p>
          <div className="w-full px-4 mt-2">
            {isAuthenticated ? (
              !isPending ? (
                <FileUpload createChat={createChatProp} />
              ) : (
                <Progress className="bg-slate-300" value={progress} />
              )
            ) : (
              <Link to={"/sign-in"}>
                <Button>
                  Login to get Started!
                  <LogIn />
                </Button>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
