"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { Room } from "@/db/schema";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(2),
    gitHubRepo: z.string().min(1),
    tags: z.string().min(1)

})
// type RoomData = Omit<Room, "userId">;

export function CreateRoomForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            gitHubRepo: "",
            tags: "",

        }
    })

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createRoomAction(values)
        router.push('/');
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public room name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please Describe what you are be coding on!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gitHubRepo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GithubRepo</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please put a link to the project you are working on
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="NextJS, NodeJS, Kotlin, Python"/>
                                </FormControl>
                                <FormDescription>
                                    List your Programming lanuages/Technology you are working with
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>

            </Form>
        </div>
    )
} 