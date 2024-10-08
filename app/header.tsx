"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";




function DropDownMenu() {
    const session = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}>
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user?.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {session.data?.user.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                
                    <DropdownMenuItem onClick={() => signOut({
                        callbackUrl:"/"
                    })}>
                        <LogOut className="mr-2"/> Sign out
                    </DropdownMenuItem>
                
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export function Header() {
    const session = useSession()
    const isLoggedIn = !!session.data;

    return (

        <header className="py-2 bg-gray-100 dark:bg-gray-900 mx-auto z-10 relative">
            <div className="flex justify-between items-center m-1">
                
                <Image
                    width="60"
                    height="60"
                    src={'/ic_launcher-web.png'} alt="logo"/>
                <nav className="flex gap-4">
                    { isLoggedIn &&<>
                        <Link className="text-slate-600 dark:text-white hover:underline" href={"/"}>
                            Browse
                        </Link>

                        <Link className="text-slate-600 dark:text-white hover:underline" href={"/your-rooms"}>
                            Your Rooms
                        </Link>
                    
                    
                        </>
                    }
                    
                </nav>
                <div className="flex items-center gap-4">
                    {session.data && <DropDownMenu />}
                    {!session.data && (
                    <Button onClick={() => signIn("google")}>
                        <LogIn className="mr-2"/> Sign in
                    </Button>)
                    }
                    <ModeToggle />

                </div>
            </div>

        </header>
    )
}