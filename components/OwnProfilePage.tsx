
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
type CardProps = {
    className?: string
    [key: string]: any
    loggedUser:{
        UserName:string,
        Email:string
    }
}

export function OwnProfilePage({ className,loggedUser }: CardProps) {
    // console.log(loggedUser)
    return (

        <div className={cn("lg:w-[380px] mb-2 px-2 py-2 rounded", className)}>

            <div className='flex justify-between'>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs font-medium leading-none">
                            {loggedUser?.UserName}
                        </p>
                        <p className="text-xs text-muted-foreground">{loggedUser?.Email}</p>
                    </div>
                </div>

                <Button className="text-[#0095F6] text-[12px]" variant={"ghost"}>Log out</Button>

            </div>
        </div>
    )
}
