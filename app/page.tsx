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


function RoomCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

  )
}
export default async function Home() {

  const rooms = await db.query.room.findMany();
  
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">
          Find Rooms
        </h1>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      {/* {rooms.map((room)=>{
        return (
          <RoomCard/>
        )
      })} */}

    </main>
  );
}
