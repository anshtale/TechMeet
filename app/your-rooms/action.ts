"use server"

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { deleteUserRoom, getRoom } from "@/lib/rooms";
import { revalidatePath } from "next/cache";

export async function deleteRoom(roomId : string){
    const session = await getSession();

    if(!session){
        throw new Error("User not authenticated")
    }

    const room = await getRoom(roomId);

    if(room?.userId !== session.user.id){
        throw new Error("User not authorized")

    }
    await deleteUserRoom(roomId);

    revalidatePath("/your-rooms")
}