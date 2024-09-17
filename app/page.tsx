import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getRooms } from "@/lib/rooms";
import { TagsList } from "@/components/ui/tags-list";
import { SearchBar } from "@/app/search-bar";
import { splitTags } from "@/lib/utils";


function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden break-words">
      <CardHeader>
        <CardTitle className="font-sans font-semibold tracking-tight">{room.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-sans">{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)}/>

        {room.gitHubRepo && 
          <Link className= "font-sans mb-2 flex items-center gap-2"
            href={room.gitHubRepo ?? ""}
            target="_blank"
            rel = "noopener noreferrer">
            <GitHubLogoIcon className="text-xl text-muted-foreground h-5 w-5"/>
            Github Repo
          </Link>
        }
        
        

      </CardContent>
      <CardFooter>

        <Button asChild>
          <Link className="font-bold font-sans "href={`/rooms/${room.id}`}>
            Join Room
          </Link>
        </Button>
      </CardFooter>
    </Card>

  )
}
export default async function Home({searchParams} : {
  searchParams:{
  search : string
}}) {

  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-sans font-extrabold tracking-tight   text-4xl">
          Find Rooms
        </h1>


        <Button asChild>
          <Link className="font-sans" href='/create-room'>Create Room</Link>
        </Button>
      </div>
        <div className="mb-12">
          <SearchBar/>
        </div>

      <div className="grid grid-cols-3 gap-5">
        {rooms.map((room) => {
          return (
            <RoomCard key={room.id} room={room} />
          )
        })}

      </div>

    </main>
  );
}
