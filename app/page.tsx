import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";
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


function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden break-words">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.gitHubRepo && 
          <Link className= "flex items-center gap-2"
            href={room.gitHubRepo ?? ""}
            target="_blank"
            rel = "noopener noreferrer">
            <GitHubLogoIcon/>
            Github Repo
          </Link>
        }

      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>
            Join Room
          </Link>
        </Button>
      </CardFooter>
    </Card>

  )
}
export default async function Home() {

  const rooms = await getRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">
          Find Rooms
        </h1>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
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
