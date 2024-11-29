import { useCustomAuth } from "@/contexts/auth-context";
import { ReactNode } from "react";
import { Outlet } from "react-router";

interface LoadUserProps {
    children: ReactNode;
}
export default function LoadUser({ children }: LoadUserProps) {
    const {isLoaded} = useCustomAuth()

    if(!isLoaded) return 'loading'
    
    return children
}