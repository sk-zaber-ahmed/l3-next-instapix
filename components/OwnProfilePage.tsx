
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutButton from "./LogoutButton";
import { fetchUserDetails } from "@/lib/data";
import { parseImage } from "@/lib/actions";

type CardProps = {
  className?: string;
  [key: string]: any;
  loggedUser: {
    UserName: string;
    Email: string;
  };
};

export async function OwnProfilePage({ className, loggedUser }: CardProps) {
  const loggedUserDetail = await fetchUserDetails(loggedUser?.UserName)
  const { avatar } = loggedUserDetail?.details?.user
  const parsedAvatar = await parseImage(avatar[0]);
  //console.log(parsedAvatar)
  return (
    <div className={cn("lg:w-[100%] mb-2 px-2 py-2 rounded", className)}>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4 w-[70%]">
          <Avatar>
            <AvatarImage src={parsedAvatar?.Url ? parsedAvatar?.Url : "https://github.com/shadcn.png" }/>
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>

          <div className="w-[70%]">
            <p className="text-xs font-medium leading-none truncate">
              {loggedUser?.UserName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {loggedUser?.Email}
            </p>
          </div>
        </div>

        <LogoutButton></LogoutButton>
        
      </div>
    </div>
  );
}
