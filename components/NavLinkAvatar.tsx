import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavLinkAvatar = ({ image }: { image: string }) => {
  return (
    <>
      <Avatar className={"w-6 h-6 "}>
        <AvatarImage
          src={image || "https://github.com/shadcn.png"}
          alt="avatar"
        />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </>
  );
};
export default NavLinkAvatar;
