import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavLinkAvatar = ({ size }: { size: number }) => {
  return (
    <>
      <Avatar className={`w-${size} h-${size} `}>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>ZA</AvatarFallback>
      </Avatar>
    </>
  );
};
export default NavLinkAvatar;
