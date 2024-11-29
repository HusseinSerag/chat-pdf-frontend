import { LoadingSpinner } from "@/components/ui/loader";
import { useCustomAuth } from "@/contexts/auth-context";
import { ReactNode } from "react";
import { Outlet } from "react-router";

interface LoadUserProps {
    children: ReactNode;
}
export default function LoadUser({ children }: LoadUserProps) {
    const {isLoaded} = useCustomAuth()

    if(!isLoaded) return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
        <LoadingSpinner />
    </div>
    
    return children
}