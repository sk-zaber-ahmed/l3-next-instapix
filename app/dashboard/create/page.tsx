import PostCreation from "@/components/PostCreation";
import { fetchLoggedInUser, parseImage } from "@/lib/actions";
import { fetchUserDetails } from "@/lib/data";



async function CreatePage() {
  //The user who is loggedin to the app
  const loggedIn = await fetchLoggedInUser();
  const {UserName}=loggedIn
  const loggedUserDetails= await fetchUserDetails(UserName);
  const {avatar,userName}=loggedUserDetails?.details?.user
  //get the parsed image of avatar
  const parsedAvatar = await parseImage(avatar[0]);
  //console.log(parsedAvatar);

  return (
      <div>
        <PostCreation parsedAvatar={parsedAvatar} userName={userName}></PostCreation>
      </div>
  );
}

export default CreatePage;
