import useGetChat from "@/api/chats/useGetChat";
import { LoadingSpinner } from "@/components/ui/loader";
import { ReactNode } from "react";
import { Navigate } from "react-router";

interface LoadChatProps {
  children: ReactNode;
}
export default function LoadChat({ children }: LoadChatProps) {
  const { isPending, isError } = useGetChat();

  if (isPending)
    return (
      <div className="min-h-full w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
        <LoadingSpinner />
      </div>
    );
  else if (isError) return <Navigate to={"/"} replace />;
  else return children;
}
