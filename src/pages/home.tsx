import { Button } from "@/components/ui/button";
import { useCustomAuth } from "@/contexts/auth-context";
import {  UserButton } from "@clerk/clerk-react";
import {  Inbox, LogIn } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
   const {userId, } =  useCustomAuth()
   const isAuthenticated = !!userId;
    
    return <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 ">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">

        <main className="flex flex-col items-center gap-2 text-center">
            <div className="flex w-fit items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-semibold">Chat with any PDF</h1>
                <UserButton  />
            </div>
            <div className="flex">
                {isAuthenticated && <Button size={'sm'}>Go to Chats </Button>}
            </div>
            <p className="max-w-[80%] text-sm sm:text-base text-balance text-slate-800">
                Join millions of students, researchers, and proffessionals to instantly answer questions and understand research with AI
            </p>
            <div className="w-full mt-2">
                {isAuthenticated ? <label className="bg-white h-36 p-2 flex items-center rounded-md justify-center" htmlFor="file"> 
                    <div className="flex gap-2 flex-col items-center rounded-md border-[3px] border-dashed border-gray-400 justify-center h-full w-full bg-gray-300 ">
                        <Inbox className="text-purple-900 w-8 h-8" />
                        <div className="text-sm text-gray-600 font-semibold">Drop PDF Here</div>
                    </div>
                <input type="file" className="hidden"  id="file" />
                </label>
                :
                <Link to={"/sign-in"}>
                    <Button>Login to get Started!
                        <LogIn />
                    </Button>   
                </Link>
                }
            </div>

        </main>
        </div>
    </div>
}