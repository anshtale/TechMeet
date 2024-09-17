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
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"



const formSchema = z.object({
    search: z.string().min(1).max(50),
})


export function SearchBar(){
    const router = useRouter();
    const query = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query.get("search") ?? ""
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // await createRoomAction(values)
        if(values.search){
            router.push(`/?seach=${values.search}`);
        }else{
            router.push("/")
        }
    }

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="w-[440px]"{...field} placeholder="Filter Rooms by keywords, such as TypeScript, NextJs" />
                                </FormControl>
                                <FormDescription>
                                    This is your public room name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        <SearchIcon className="mr-2"/> Submit</Button>
                    {query.get("search") && (
                        <Button variant="link"
                        onClick={()=>{
                            form.setValue("search","");
                            router.push('/');
                        }}>
                            Clear
                        </Button>
                    )}
                </form>

            </Form>
    )
}