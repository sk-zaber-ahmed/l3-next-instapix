import { fetchPostById } from "@/lib/data";
import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";
import { multiImageParse } from "@/lib/actions";

type Props = {
    params: {
        id: string;
    };
};

async function EditPostPage({ params: { id } }: Props) {

    const post = await fetchPostById(id);
    const parsedImages=await multiImageParse(post?.post?.files)
    if (!post) {
        notFound();
    }

    return <EditPost postId={id} post={post} parsedImages={parsedImages}/>;
}

export default EditPostPage;