"use client";
import Link from "next/link";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";

function Following({ following }: { following: any }) {

  return (
    <div className="p-4 flex items-center justify-between gap-x-3">
        <h1>{following?.userName}</h1>
        <Button className="text-white text-[12px]"  variant={"destructive"}>Unfollow</Button>
    </div>
  );
}

export default Following;