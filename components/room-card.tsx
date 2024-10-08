"use client"

import { Button } from "@/components/ui/button";
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
import { TagsList } from "@/components/ui/tags-list";
import { splitTags } from "@/lib/utils";

export function RoomCard({ room }: { room: Room }) {
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