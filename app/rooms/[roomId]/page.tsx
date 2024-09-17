import { Badge } from "@/components/ui/badge";
import { splitTags, TagsList } from "@/components/ui/tags-list";
import { getRoom } from "@/lib/rooms";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { Badge } from "lucide-react";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";

export default async function RoomPage(props : {params : {roomId:string}}){

    const roomId = props.params.roomId
    const room = await getRoom(roomId);
    if(!room){
        return <div>No room with ID found!</div>
    }

    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                    <DevFinderVideo room={room}/>
                </div>
            </div>
            <div className="p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-2xl">{room?.name} </h1>
                    {room.gitHubRepo && 
                        <Link className= "flex items-center gap-2 text-center text-sm"
                            href={room.gitHubRepo ?? ""}
                            target="_blank"
                            rel = "noopener noreferrer">
                            <GitHubLogoIcon className="h-5 w-5"/>
                            Github Repo
                        </Link>
                    }
                    <p className="text-base text-gray-600">{room?.description} </p>
                    
                    <h3>Tags: </h3>
                    <TagsList tags={splitTags(room.tags)}/>
                </div>
            </div>
            
        </div>
    )
}