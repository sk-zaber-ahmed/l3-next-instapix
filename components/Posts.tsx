import { fetchFollowersPost,fetchInstaPosts } from "@/lib/data";
import Post from "./Post";
// import { fetchInstaPosts } from "@/lib/actions";

async function Posts() {
  //const posts = await fetchFollowersPost();
  //console.log(posts)
  let loggedInUser="fdd29cd4-bde4-4b11-9557-2a41241cf2c2"
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
