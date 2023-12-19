
import ProfilePostsGrid from "@/components/ProfilePostsGrid";
import { fetchPostsByUsername } from "@/lib/data";

async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const posts = await fetchPostsByUsername(username);

  return <ProfilePostsGrid posts={posts} />;
}

export default ProfilePage;