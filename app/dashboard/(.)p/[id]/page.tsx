import PostView from '@/components/PostView';
import { fetchLoggedInUser, multiImageParse } from '@/lib/actions';
import { fetchPostById } from '@/lib/data';
import { notFound } from 'next/navigation';
import React from 'react';

const PostModal = async ({ params }: { params: { id: string } }) => {
    const post = await fetchPostById(params.id);
    const loggedIn = await fetchLoggedInUser()
    //image parser called
    const multiImage = await multiImageParse(post?.post?.files);

    if (!post) {
        notFound();
    }

    return <PostView id={params.id} post={post?.post} multiImage={multiImage} loggedIn={loggedIn?.UserId} />;
};

export default PostModal;