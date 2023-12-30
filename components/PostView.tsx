"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import Link from 'next/link';
import UserAvatar from './UserAvatar';
import { ScrollArea } from './ui/scroll-area';
import useMount from '@/hooks/useMount';
import PostActions from './PostActions';
import { ImageSlider } from './ImageSlider';
import axios from 'axios';

type props = {
    id: string
    post: any
    loggedIn: any
    multiImage: any
}

const PostView = ({ id, post, loggedIn, multiImage }: props) => {
    // console.log('post', post)

    const pathName = usePathname();
    const isPostModal = pathName === `/dashboard/p/${id}`
    const router = useRouter();
    const username = post?.userName
    const href = `/dashboard/${username}`;
    const mount = useMount();


    if (!mount) return null;

    //onOpenChange={(open) => !open && router.back()} this is for when we click outside the modal it will go back to the previous page
    return (
        <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
            <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[400px] xl:max-h-[500px]">
                <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
                    <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
                        <Link href={href}>
                            <UserAvatar user={post.user} />
                        </Link>
                        <Link href={href} className="font-semibold text-sm">
                            {username}
                        </Link>
                    </DialogHeader>

                    <DialogHeader className="flex border-b space-y-0 py-4 pl-3.5 pr-6">
                        {post?.content && (
                            <div className="text-[14px] leading-none flex items-center space-x-2 font-medium px-2 sm:px-0 mt-2 mb-2">
                                <Link href={`/dashboard/${post?.userName}`} className="font-bold">
                                    {post?.userName}
                                </Link>
                                <p className='font-normal'>{post?.content}</p>
                            </div>
                        )}
                        <div className="hidden md:block mt-auto">
                            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </DialogHeader>
                    {/* 
                    <ScrollArea className="hidden md:inline border-b flex-1 py-1.5">
                        <MiniPost post={post} />
                        {post.comments.length > 0 && (
                            <>
                                {post.comments.map((comment) => {
                                    return (
                                        <Comment
                                            key={comment.id}
                                            comment={comment}
                                            inputRef={inputRef}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </ScrollArea> */}

                    {/* <ViewPost className="hidden md:flex border-b" /> */}

                    <div className="px-2 hidden md:block mt-auto p-2.5">
                        <PostActions post={post} loggedIn={loggedIn} />
                        <time className="text-[11px]  uppercase text-zinc-500 font-medium">
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                </div>

                <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[500px] max-w-3xl w-full rounded">
                    <ImageSlider multiImage={multiImage} images={post?.files} />
                </div>



                <PostActions
                    post={post}
                    loggedIn={loggedIn}
                    className="md:hidden border-b p-2.5"
                />
                {/* <CommentForm postId={id} className="md:hidden" inputRef={inputRef} /> */}
                {/* <ViewPost className="md:hidden" /> */}
            </DialogContent>
        </Dialog>
    );
};

export default PostView;