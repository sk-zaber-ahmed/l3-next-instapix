import PostView from '@/components/PostView';
import { fetchPostById } from '@/lib/data';
import { notFound } from 'next/navigation';
import React from 'react';

const PostModal = async({ params }: { params: { id: string } }) => {
    const post = await fetchPostById(params.id);
    console.log(post)

    if (!post) {
        notFound();
    }

    return <PostView id={params.id} post={post} />;
};

export default PostModal;