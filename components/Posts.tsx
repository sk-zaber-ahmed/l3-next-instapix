import { fetchFollowersPost } from "@/lib/data";
import Post from "./Post";

async function Posts() {
  const posts = await fetchFollowersPost();
  //console.log(posts)

  return (
    <>
      {posts?.ads?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}

export default Posts;
