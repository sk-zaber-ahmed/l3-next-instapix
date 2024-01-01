import { fetchInstaPosts } from "@/lib/data";
import Post from "./Post";

type props = {
  loggedIn: any;
  userId: string;
};

async function Posts({ loggedIn, userId }: props) {
  const posts = await fetchInstaPosts(userId);
  // console.log(posts);
  return (
    <div>
      {posts?.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Posts Yet</h1>
        </div>
      ) : (
        <>
          {posts?.posts?.map((post: any) => (
            <Post key={post._id} post={post} loggedIn={userId} />
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
