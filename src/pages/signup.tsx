import { SignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

import { CircleArrowLeft, HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Signup() {
    const navigate = useNavigate()
    return <div className="min-h-screen w-full bg-gradient-to-r from-rose-100 to-teal-100 ">
        <div className="absolute left-1/2 top-1/2 flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex w-full justify-between ">
            <Link to={"/"}>
                <Button size={"icon"} variant={"outline"} className="border-2 border-primary h-10 w-10" >
                    <HomeIcon className="scale-125" />
                </Button>
            </Link>
            <Button size={"icon"} variant={"outline"} className="border-2 border-primary h-10 w-10" onClick={()=>navigate(-1)}>
                <CircleArrowLeft className="scale-125"  />
            </Button>
            </div>
            <SignUp forceRedirectUrl={"/"} signInUrl="/sign-in" signInFallbackRedirectUrl={"/sign-in"}  routing="path" path="/sign-up"  />
        </div>
    </div>
    return 
    
}