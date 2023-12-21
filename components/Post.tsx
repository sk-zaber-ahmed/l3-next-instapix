import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from './UserAvatar';
import Timestamp from './TimesStamps';
import PostOptions from './PostOptions';
import PostActions from './PostActions';
import { Separator } from './ui/separator';
import { ImageSlider } from './ImageSlider';

const Post = ({ post }: any) => {
    return (
        <div className="flex flex-col space-y-2.5 mb-[40px] lg:px-[80px]">
            <div className="flex items-center justify-between px-3 sm:px-0">
                <div className="flex space-x-3 items-center">
                    <UserAvatar user={post.user} />
                    <div className="text-sm">
                        <p className="space-x-1">
                            <span className="font-semibold">Test_User</span>
                            <span
                                className="font-medium text-neutral-500 dark:text-neutral-400
                        text-xs
                      "
                            >
                                •
                            </span>
                            <Timestamp createdAt={post.createdAt} />
                        </p>
                        <p className="text-xs text-black dark:text-white font-medium">
                            Dubai, United Arab Emirates
                        </p>
                    </div>
                </div>

                {/* Sending the post and userId=owner of the post as parameter to give some special accessibility */}
                <PostOptions post={post} />
            </div>

            <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
                {/* <Image
                    src={post?.images[0]}
                    alt="Post Image"
                    fill
                    className="sm:rounded-md object-cover"
                /> */}

                <ImageSlider images={post?.images} />
            </Card>

            <PostActions post={post} />

            {post?.description && (
                <div className="text-sm leading-none flex items-center space-x-2 font-medium px-2 sm:px-0">
                    <Link href={`/dashboard/${post?.owner}`} className="font-bold">
                        User
                    </Link>
                    <p>{post?.description?.length > 16 ? `${post?.description?.slice(0, 20)}... more` : post?.description}</p>
                </div>
            )}

            {/*<Comments postId={post.id} comments={post.comments} user={session.user} /> */}

            <Separator />
        </div>
    );
};

export default Post;