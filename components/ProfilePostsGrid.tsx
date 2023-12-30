import SingleProfilePost from "./SingleProfilePost";

function ProfilePostsGrid({ posts }: any) {
  //console.log('own posts',posts?.ownPosts)
  if (posts?.ownPosts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl 2xl:max-w-4xl mx-auto pb-20">
        <p className="font-semibold text-sm text-neutral-400">No more posts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts?.ownPosts?.map((post:any) => (
        <SingleProfilePost key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePostsGrid;
