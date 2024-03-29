import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import Timestamp from "./TimesStamps";
import PostOptions from "./PostOptions";
import PostActions from "./PostActions";
import { Separator } from "./ui/separator";
import { ImageSlider } from "./ImageSlider";
import { multiImageParse, parseImage } from "@/lib/actions";
import { fetchUserDetails } from "@/lib/data";

const Post = async ({ post, loggedIn }: any) => {
  const { files, userName } = post;
  const userDetails = await fetchUserDetails(userName);
  //console.log(userDetails)

  const parsed = await parseImage(userDetails?.details?.user?.avatar[0]);
  //console.log(parsed)

  const multiImage = await multiImageParse(files);
  //console.log(multiImage)

  return (
    <div className="flex flex-col mb-[40px] md:px-[70px] lg:px-[20%] xl:px-[14%] 2xl:px-[18%]">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center mb-4">
          <UserAvatar user={parsed?.Url} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{userName}</span>
              <span
                className="font-medium text-neutral-500 dark:text-neutral-400
                        text-xs
                      "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
            {/* <p className="text-xs text-black dark:text-white font-medium">
              Dubai, United Arab Emirates
            </p> */}
          </div>
        </div>

        {/* Sending the post and userId=owner of the post as parameter to give some special accessibility */}
        <PostOptions post={post} loggedIn={loggedIn} />
      </div>

      <Card className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-none sm:rounded-md">
        {/* <Image
                    src={post?.images[0]}
                    alt="Post Image"
                    fill
                    className="sm:rounded-md object-cover"
                /> */}

        <ImageSlider multiImage={multiImage} images={post?.files} />
      </Card>

      <PostActions post={post} loggedIn={loggedIn} />

      {post?.content ? (
        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0 mt-2 mb-4">
          <Link href={`/dashboard/${post?.userName}`} className="font-bold">
            {post?.userName}
          </Link>
          <p className="font-normal">{post?.content}</p>
        </div>
      ) : (
        <div>
          <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0 mt-2 mb-4"></div>
        </div>
      )}

      {/*<Comments postId={post.id} comments={post.comments} user={session.user} /> */}

      <Separator />
    </div>
  );
};

export default Post;
