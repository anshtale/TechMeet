import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getRooms, getUserRooms } from "@/lib/rooms";
import { UserRoomCard } from "./room-card";



export default async function YourRoom() {

  const rooms = await getUserRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-sans font-extrabold tracking-tight   text-4xl">
          Your Rooms
        </h1>
        <Button asChild>
          <Link className="font-sans" href='/create-room'>Create Room</Link>
        </Button>
      </div>
    

      <div className="grid grid-cols-3 gap-5">
        {rooms.map((room) => {
          return (
            <UserRoomCard key={room.id} room={room} />
          )
        })}

      </div>

    </main>
  );
}
