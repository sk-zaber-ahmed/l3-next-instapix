"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { followingUser } from "@/lib/actions";
import { toast } from "sonner";
type CardProps = {
  suggestion: any;
  className?: string;
  [key: string]: any;
  loggedInUser: string;
};

export function FollowersSuggestionCard({
  className,
  suggestion,
  loggedInUser,
}: CardProps) {
  return (
    <div className={cn("lg:w-[100%] mb-2 px-2 py-2 rounded", className)}>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4 w-[70%]">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="w-[70%]">
            <p className="text-xs font-medium leading-none truncate">
              {suggestion?.userName}
            </p>
            <p className="text-xs text-muted-foreground truncate hover:text-clip">
              {suggestion?.userEmail}
            </p>
          </div>
        </div>

        {/* form client component in that we are using server action so that "use client" */}
        <form
          action={async (formData: FormData) => {
            const userToFollow = formData.get("userId");
            //console.log(userToFollow)

            await followingUser(loggedInUser, userToFollow);
            toast.success("You are now follwoing him!");
          }}
        >
          <Button
            name="userId"
            value={suggestion?.userId}
            className="text-[#0095F6] text-[12px]"
            variant={"ghost"}
          >
            Follow
          </Button>
        </form>
      </div>
    </div>
  );
}
