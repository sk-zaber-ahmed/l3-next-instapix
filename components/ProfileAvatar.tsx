import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import Image from "next/image";

type Props = Partial<AvatarProps> & {
  image: string | undefined;
  profileName: string | undefined;
};

function ProfileAvatar({ image, profileName, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        src={image || "https://github.com/shadcn.png"}
        fill
        alt={`${profileName}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default ProfileAvatar;
