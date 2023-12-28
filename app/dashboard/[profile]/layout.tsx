import React, { ReactNode } from "react";
import data from "@/lib/fake-data.json";
import { MoreHorizontal, Settings } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileHeader from "@/components/ProfileHeader";
import FollowButton from "@/components/FollowButton";
import { Button, buttonVariants } from "@/components/ui/button";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  //------Actual logic------//
  // const profile = await fetchProfile(username);
  // const session = await auth();
  // const isCurrentUser = session?.user.id === profile?.id;
  // //   the followerId here is the id of the user who is following the profile
  // const isFollowing = profile?.followedBy.some(
  //   (user) => user.followerId === session?.user.id
  // );

  //------Fake logic------//
  const session = {
    user: {
      id: "1",
    },
  };
  const isCurrentUser = true;
  const { profile } = data;
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
  );

  if (!profile) {
    notFound();
  }

  return (
    <>
      <ProfileHeader username={profile.username} />
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-x-5 md:gap-x-10 px-4">
          <ProfileAvatar
            user={profile}
            className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
          />

          <div className="md:px-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <p className="font-semibold text-xl col-span-2 md:col-span-1">
                {profile.username}
              </p>
              {isCurrentUser ? (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="hidden md:block md:order-last"
                  >
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: "!font-bold",
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Edit profile
                  </Link>
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>
                  <FollowButton
                    isFollowing={isFollowing}
                    profileId={profile.id}
                  />
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="hidden md:flex md:items-center md:gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followedBy.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm -ml-24 md:ml-0 space-y-2">
              <h1 className="font-bold ">{profile.name}</h1>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4 space-y-2">
          <Separator className="border-[1px]" />

          <div className="flex justify-around items-center">
            <p className="whitespace-pre-line text-center text-sm">
              <strong>{profile.posts.length}</strong>
              <br />
              posts
            </p>
            <p className="whitespace-pre-line text-center text-sm">
              <strong>{profile.followedBy.length}</strong>
              <br />
              followers
            </p>
            <p className="whitespace-pre-line text-center text-sm">
              <strong>{profile.following.length}</strong>
              <br />
              following
            </p>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />

        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
