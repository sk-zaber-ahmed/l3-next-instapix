import { fetchFollowersPost, fetchInstaPosts} from "@/lib/data";
import Post from "./Post";
import { fetchLoggedInUser } from "@/lib/actions";
// import { fetchInstaPosts } from "@/lib/actions";

async function Posts() {
  const loggedIn = await fetchLoggedInUser()
  const loggedInUserId = "7e648dc6-f120-42e6-9c34-8cf366a63654";
  const posts = await fetchInstaPosts(loggedInUserId);
  //console.log(loggedIn)
  return (
    <>
      {posts?.posts?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))}
      <h1>{loggedIn?.UserName}</h1>
    </>
  );
}

export default Posts;
