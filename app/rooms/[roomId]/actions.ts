"use server"

import { getSession } from "@/lib/auth";

// import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react"
import {StreamChat} from "stream-chat"

export async function generateTokenAction(){
    const session = await getSession();

    if(!session){
        throw new Error('Not logged in')
    }

    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!

    const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_SECRET_KEY!

    const serverClient = StreamChat.getInstance(apiKey,api_secret)

    const token = serverClient.createToken(session.user.id);

    return token;

    
}