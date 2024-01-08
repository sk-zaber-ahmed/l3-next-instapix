import React from "react";
import Logo from "./Logo";
import { MoreDropDown } from "./MoreDropDown";
import NavLinks from "./NavLinks";
import { fetchLoggedInUser, parseImage } from "@/lib/actions";
import { fetchUserDetails } from "@/lib/data";

const SideNavbar = async () => {
  const loggedIn = await fetchLoggedInUser();
  const { UserName } = loggedIn;
  const loggedInUserDetails = await fetchUserDetails(UserName);
  const { avatar, userName } = loggedInUserDetails?.details?.user;
  //get the parsed image of avatar
  const parsedAvatar = await parseImage(avatar[0]);
  const {Url}=parsedAvatar
  console.log(Url)

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="border-t -ml-3 md:ml-0 bg-white dark:bg-neutral-950 h-16 justify-evenly fixed z-50 flex-1 w-full md:relative md:h-full bottom-0 md:border-none flex flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2">
        <Logo />
        <NavLinks
          profileName={userName}
          profileImage={Url}
        />
        {/* remove the hard coded profile value  */}
        <div className="hidden md:flex relative md:mt-auto flex-1 items-end w-full">
          <MoreDropDown />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
