import React from "react";
import { FollowersSuggestionCard } from "./FollowersSuggestionCard";
import { OwnProfilePage } from "./OwnProfilePage";
import { fetchSuggestedUsers } from "@/lib/data";
import { Button } from "./ui/button";

type props = {
  loggedUser: any;
  userId: string;
};

const FollowersSuggestion = async ({ loggedUser, userId }: props) => {
  //let loggedInUser = "7e648dc6-f120-42e6-9c34-8cf366a63654";
  const suggestedUser = await fetchSuggestedUsers(userId);
  //console.log(suggestedUser);

  return (
    <div>
      <OwnProfilePage loggedUser={loggedUser}></OwnProfilePage>

      <div className="flex justify-between items-center mb-2 p-2 lg:w-[100%]">
        <h1 className="text-[14px] text-gray-400 font-bold">
          Suggested for you
        </h1>
        {/* <h1 className="text-[13px]">See All</h1> */}
        <Button className="text-[#ffffff] text-[12px]" variant={"ghost"}>
          See All
        </Button>
      </div>
      {suggestedUser?.suggestions?.map((suggestion: any, index: any) => (
        <div key={index}>
          <FollowersSuggestionCard
            loggedInUser={userId}
            suggestion={suggestion}
          ></FollowersSuggestionCard>
        </div>
      ))}
    </div>
  );
};

export default FollowersSuggestion;
