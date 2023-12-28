import { fakepost } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";


interface Props {
    post: fakepost;
    className?: string;
}

function PostActions({ post, className }: Props) {

    //userId will be come from who is loggedin user now 
    const userId = "64eb61e611e76cab67d456de"  //testing purpose

    return (
        <div className={cn("relative flex justify-between w-full", className)}>
            <div className='flex'>
                <LikeButton post={post} userId={userId} />
                <div>
                    <Link href={`/dashboard/p/${post._id}`}>
                        <ActionIcon>
                            <MessageCircle className={"h-6 w-6"} />
                        </ActionIcon>
                    </Link>
                </div>
                <ShareButton postId={post._id} />
            </div>


            <BookmarkButton post={post} userId={userId} />

        </div>
    );
}

export default PostActions;