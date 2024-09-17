'use client'
import { useRouter } from "next/navigation";
import { Badge } from "./badge"

export function TagsList({tags} : {tags : string[]}){
    const router = useRouter();
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map((tag)=>{
                return <Badge onClick={()=>{
                    router.push(`/?search=${tag}`)
                }} className="font-sans rounded-full w-fit cursor-pointer"

                key={tag}
                tabIndex={0}
                role="button">
                    {tag}
                </Badge>
            })}
        </div>
    )
}