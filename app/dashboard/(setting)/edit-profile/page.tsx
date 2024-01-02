import ProfileForm from "@/components/ProfileForm";
import { fetchLoggedInUser } from "@/lib/actions";
import { fetchUserDetails } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {
    const profile=await fetchLoggedInUser()
    console.log('edit profile',profile);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12 ml-[100px]">
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
