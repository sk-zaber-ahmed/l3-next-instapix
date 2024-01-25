import FollowersModal from "@/components/FollowersModal";
import { fetchFollowers, fetchUserDetails } from "@/lib/data";

async function FollowersPage({
    params: { profile },
}: {
    params: {
        profile: string;
    };
}) {
    const userDetails = await fetchUserDetails(profile)
    const { userId } = (userDetails?.details?.user)
    const userFollowers = await fetchFollowers(userId)
    //console.log('followes',userFollowers)
    return <FollowersModal username={profile} followers={userFollowers?.followers}/>;
}

export default FollowersPage;
