"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { setEngine, sign } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




function DropDownMenu() {
    const session = useSession();
    const isLoggedIn = !!session.data;
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
                {isLoggedIn ? (
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2"/> Sign out
                    </DropdownMenuItem>
                ) : (<DropdownMenuItem onClick={() => signIn("google")}>
                    <LogIn className="mr-2"/> Sign in
                </DropdownMenuItem>)}
                {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export function Header() {
    const session = useSession()

    return (

        <header className="py-2 bg-gray-100 dark:bg-gray-900 mx-auto">
            <div className="flex justify-between items-center m-1">
                <div>
                    Logo
                </div>
                <div className="flex items-center gap-4">
                    <DropDownMenu />
                    <ModeToggle />

                </div>
            </div>

        </header>
    )
}