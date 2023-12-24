import { fetchFollowersPost,fetchInstaPosts } from "@/lib/data";
import Post from "./Post";
// import { fetchInstaPosts } from "@/lib/actions";

async function Posts() {
  //const posts = await fetchFollowersPost();
  //console.log(posts)
  let loggedInUser="7e648dc6-f120-42e6-9c34-8cf366a63654"
  const instaPosts=await fetchInstaPosts(loggedInUser);

  return (
    <>
      {instaPosts?.posts?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}

export default Posts;
