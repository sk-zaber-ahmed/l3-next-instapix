"use client"
import React from 'react';
import ActionIcon from './ActionIcon';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { likePost } from '@/lib/actions';
import { useOptimistic } from 'react';


interface Props {
    post: any;
    userId: string;
}

const LikeButton = ({ post, userId }: Props) => {

    const [optimisticLike, addOptimisticLike] = useOptimistic(
        post.likedBy,
        // updateFn 
        //currentState a post.likedBy initially thakbey
        (currentState, newLike) => {
            // merge and return new state
            // with optimistic value

            //already like korey thakley unlike hobey
            if (currentState.includes(newLike)) {
                return currentState.filter((id: string) => id !== newLike);
            }

            //like korey na thakley like hobey
            return [...currentState, newLike];
        }
    );

    //console.log('optimisticLike',optimisticLike)
    // console.log('post',post)

    // const handleLike=async (formData: FormData) => {

    //     const postId = formData.get("postId");   //this is how we can get the value of the hidden input field
    //     // console.log(postId,userId)

    //     addOptimisticLike({ userId });

    //     const result=await likePost(postId,userId);
    //     console.log('result will be',result);
    // };

    return (
        <div>
            <form
                action={async (formData: FormData) => {
                    const postId = formData.get("postId");
                    console.log(postId, userId);
                    addOptimisticLike(userId);

                    const result=await likePost(postId, userId);
                    console.log('result will be',result);
                }}
            >
                <input type="hidden" name="postId" value={post._id} />

                <ActionIcon>
                    <Heart
                        className={cn("h-6 w-6", {
                            "text-red-500 fill-red-500": optimisticLike.includes(userId),
                        })}
                    />
                </ActionIcon>
            </form>

            {optimisticLike.length > 0 && (
                <p className="text-[14px] leading-none flex items-center space-x-2 font-medium px-2 sm:px-0 mt-2 dark:text-white">
                    {optimisticLike.length}{" "}
                    {optimisticLike.length === 1 ? "like" : "like"}
                </p>
            )}
        </div>
    );
};

export default LikeButton;