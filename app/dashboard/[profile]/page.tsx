//Dynamic routing applied to the profile page

import ProfilePostsGrid from "@/components/ProfilePostsGrid";
import { fetchPostsByUsername } from "@/lib/data";

async function ProfilePage({ params }: { params: { profile: string } }) {
  //console.log(params.profile);
  const username = params.profile;
  const posts = await fetchPostsByUsername(username);

  return <ProfilePostsGrid posts={posts} />;
}

export default ProfilePage;