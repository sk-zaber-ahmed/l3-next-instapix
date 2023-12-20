
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { BellIcon, CheckIcon } from "lucide-react"

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export function FollowersSuggestionCard({ className, ...props }: CardProps) {
    return (
        <Card className={cn("lg:w-[380px] mb-2", className)} {...props}>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
           
            <CardFooter>
                <Button className="w-full">
                    <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
                </Button>
            </CardFooter>
        </Card>
    )
}
