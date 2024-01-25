import FollowingModal from "@/components/FollowingModal";
import { fetchFollowedUsers,fetchUserDetails } from "@/lib/data";

async function FollowingPage({
    params: { profile },
}: {
    params: {
        profile: string;
    };
}) {
    const userDetails = await fetchUserDetails(profile)
    const { userId } = userDetails?.details?.user
    const userFollowing = await fetchFollowedUsers(userId)
    console.log('User Following==>',userFollowing)
    return <FollowingModal username={profile} followings={userFollowing?.following}/>;
}

export default FollowingPage;