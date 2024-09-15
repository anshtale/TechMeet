"use client"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreateRoomForm } from "./create-room-form"



export default function CreateRoomPage(){

    return (
        <div className="container mx-auto flex flex-col gap-4 pt-12 pb-24">
            <h1 className="text-4xl font-bold"> Create Room </h1>
            <CreateRoomForm/>
        </div>
        
    )
} 