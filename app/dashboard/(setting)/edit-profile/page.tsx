import ProfileForm from "@/components/ProfileForm";
import { fetchLoggedInUser, parseImage } from "@/lib/actions";
import { fetchUserDetails } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {

  const profile = await fetchLoggedInUser()
  const loggedUserDetail = await fetchUserDetails(profile?.UserName)
  //console.log('edit profile',loggedUserDetail);
  //get the parsed image of avatar
  const { avatar, userName } = loggedUserDetail?.details?.user
  const parsedAvatar = await parseImage(avatar[0]);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12 md:ml-[100px]">
      <ProfileForm profile={profile} loggedUserDetail={loggedUserDetail?.details?.user} parsedAvatar={parsedAvatar?.Url}/>
    </div>
  );
}

export default EditProfile;
