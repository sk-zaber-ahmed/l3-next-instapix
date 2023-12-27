import { fetchFollowersPost, fetchInstaPosts} from "@/lib/data";
import Post from "./Post";
import { fetchLoggedInUser } from "@/lib/actions";
// import { fetchInstaPosts } from "@/lib/actions";

async function Posts() {
  const loggedIn=await fetchLoggedInUser()
  console.log(loggedIn)
  return (
    <>
      {/* {instaPosts?.posts?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))} */}
      <h1>Test</h1>
    </>
  );
}

export default Posts;
