import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  user: any | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
  return (
    <Avatar>
      <Image
        src={
          user ||
          "https://github.com/shadcn.png"
        }
        width={40}
        height={40}
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default UserAvatar;
