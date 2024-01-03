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
import { fetchLoggedInUser, parseImage } from "@/lib/actions";
import type { Metadata, ResolvingMetadata } from "next";
import UserAvatar from "@/components/UserAvatar";
import { fetchUserDetails } from "@/lib/data";


type Props = {
  params: {
    profile: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.profile;

  const userProfile = await fetchUserDetails(username);
  console.log("userProfile", userProfile)

  return {
    title: `(@${userProfile?.details?.user?.userName})`,
  };
}

const ProfileLayout = async ({ children, params: { profile } }: Props) => {

  const userProfile = await fetchUserDetails(profile);
  const {avatar}=userProfile?.details?.user
  //get the parsed image of avatar
  const parsedAvatar = await parseImage(avatar[0]);
  const loggedIn = await fetchLoggedInUser()
  const isCurrentUser = loggedIn?.UserName === userProfile?.details?.user?.userName;
  //   the followerId here is the id of the user who is following the profile
  const isFollowing = userProfile?.details?.user?.followers?.includes(loggedIn?.UserId);

  if (!loggedIn) {
    notFound();
  }

  return (
    <>
      <ProfileHeader username={userProfile?.details?.user?.userName} />
      <div className="max-w-4xl mx-auto md:mt-6">
        <div className="flex justify-center gap-x-2 md:gap-x-6 px-4">
          <ProfileAvatar
            className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
            image={parsedAvatar?.Url}
            profileName={profile}
          />

          <div className="md:px-10 space-y-4">
            <div className="flex items-center gap-3">
              <p className="font-normal text-[13px] md:text-[17px] col-span-2 md:col-span-1">
                {userProfile?.details?.user?.displayName || 'Test User'}
              </p>
              {isCurrentUser ? (
                <>
                  {/* <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="hidden md:block md:order-last"
                  >
                    <Settings />
                  </Button> */}
                  <Button  className={buttonVariants({
                        className: "font-bold",
                        variant: "secondary",
                        size: "sm"
                      })}>
                    <Link
                      href={`/dashboard/edit-profile`}
                    >
                      Edit Profile
                    </Link>
                  </Button>
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    View Archive
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
                    profileId={userProfile?.details?.user?.userId}
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
              <Link href={`/dashboard`} className="font-medium">
                <strong>{userProfile?.details?.totalPost}</strong> Posts
              </Link>

              <Link
                href={`/dashboard/${userProfile?.details?.user?.userName}/followers`}
                className="font-medium"
              >
                <strong>{userProfile?.details?.user?.followers?.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${userProfile?.details?.user?.userName}/following`}
                className="font-medium"
              >
                <strong>{userProfile?.details?.user?.following?.length}</strong> following
              </Link>
            </div>

            <div className="text-sm -ml-24 md:ml-0 space-y-1">
              <h1 className="font-bold ">{loggedIn?.UserName}</h1>
              <p>{userProfile?.details?.user?.bio}</p>
            </div>
          </div>
        </div>

        {/* <div className="md:hidden mt-4 space-y-2">
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
        </div> */}

        <ProfileTabs
          profileName={profile}
          isCurrentUser={isCurrentUser}
        />

        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
