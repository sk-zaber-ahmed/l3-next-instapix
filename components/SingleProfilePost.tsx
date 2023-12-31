import { multiImageParse } from '@/lib/actions';
import { HeartIcon, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type props = {
    post: any
}

const SingleProfilePost = async ({ post }: props) => {
    const multiImage = await multiImageParse(post?.files)
    //console.log(multiImage)
    return (
        <div>
            <Link
                href={`/dashboard/p/${post._id}`}
                key={post._id}
                className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1"
            >
                <Image
                    src={multiImage[0]?.Url}
                    fill
                    sizes=""
                    alt="Post preview"
                    className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
                />
                <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
                    {post?.likedBy?.length > 0 && (
                        <div className="flex items-center font-bold space-x-1">
                            <HeartIcon className="text-white fill-white" />
                            <p className="text-white">{post?.likedBy?.length}</p>
                        </div>
                    )}

                    <div className="flex items-center font-bold space-x-1">
                        <MessageCircle className="text-white fill-white" />
                        <p className="text-white">{post?.comment?.length}</p>
                    </div>

                </div>
            </Link>
        </div>
    );
};

export default SingleProfilePost;