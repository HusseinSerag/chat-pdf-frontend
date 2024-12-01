import useGetChat from "@/api/chats/useGetChat";
import { useCustomAuth } from "@/contexts/auth-context";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { isSignedIn } = useCustomAuth();

  return isSignedIn ? <Outlet /> : <Navigate to={"/"} replace />;
}
