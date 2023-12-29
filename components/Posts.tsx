import { fetchFollowersPost, fetchInstaPosts } from "@/lib/data";
import Post from "./Post";
import { fetchLoggedInUser, multiImageParse } from "@/lib/actions";

async function Posts() {
  const loggedIn = await fetchLoggedInUser()
  //console.log(loggedIn)

  const loggedInUserId = "7e648dc6-f120-42e6-9c34-8cf366a63654";
  const posts = await fetchInstaPosts(loggedIn?.UserId);
  //console.log(posts)


  return (
    <div>
      {
        posts?.length === 0 ?
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold">No Posts Yet</h1>
          </div>
          :
          <>
            {posts?.posts?.map((post: any) => (
              <Post key={post._id} post={post} loggedIn={loggedIn} />
            ))}
          </>
      }
    </div>
  );
}

export default Posts;
