'use client'

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantListing,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";
import { error } from "console";
import { revalidatePath } from "next/cache";

  const apiKey = process.env.     NEXT_PUBLIC_GET_STREAM_API_KEY!;
  
  export function DevFinderVideo({room} : {room : Room}){
    const session = useSession();
    const router = useRouter();

    const [client,setClient] = useState<StreamVideoClient | null>(null);

    const [call,setCall] = useState<Call | null>(null);

    useEffect(()=>{
        if(!room) return;
        if(!session.data) return;

        const userId = session.data.user.id

        const client = new StreamVideoClient({ 
            apiKey, 
            user:{
                id : userId,
                name: session.data.user.name ?? undefined,
                image : session.data.user.image ?? undefined,

            }, 
            tokenProvider : () => generateTokenAction(),
        });

        const call = client.call("default", room.id);
        call.join({ create: true });

        setClient(client);
        
        setCall(call);

        return ()=>{
            call.leave().then(()=>{
                client.disconnectUser();
            }).catch(console.error);
        }
    },[session,room])
    return (
        client && call &&
        (<StreamVideo client={client}>
            <StreamTheme>
            <StreamCall call={call}>
                <SpeakerLayout />
                <CallControls onLeave={()=>{
                    
                    router.push('/');
                    // revalidatePath('/');

                }} />
                <CallParticipantsList onClose={
                    ()=>undefined
                }/>

            </StreamCall>
          </StreamTheme>
        </StreamVideo>)
      );
}