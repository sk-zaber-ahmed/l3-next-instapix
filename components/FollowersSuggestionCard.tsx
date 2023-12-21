
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
type CardProps = React.ComponentProps<typeof Card>

export function FollowersSuggestionCard({ className, ...props }: CardProps) {
    return (

        <div className={cn("lg:w-[380px] mb-2 px-2 py-2 rounded", className)} {...props}>

            <div className='flex justify-between'>
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs font-medium leading-none">
                            Olivia Martin
                        </p>
                        <p className="text-xs text-muted-foreground">m@example.com</p>
                    </div>
                </div>

                <Button className="text-[#0095F6] text-[12px]" variant={"ghost"}>Follow</Button>

            </div>
        </div>
    )
}
