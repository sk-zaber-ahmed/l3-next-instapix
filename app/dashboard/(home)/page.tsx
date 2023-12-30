
import FollowersSuggestion from "@/components/FollowersSuggestion";
import Posts from "@/components/Posts";
import { PostsSkeleton, SuggestionsSkeleton } from "@/components/Skeletons";
import { fetchLoggedInUser } from "@/lib/actions";
import { Suspense } from "react";

async function DashboardPage() {
  //The user who is loggedin to the app
  const loggedIn = await fetchLoggedInUser()
  // console.log(loggedIn)

  return (
    <main className="grid xl:grid-cols-4">

      <div className="col-span-3">
        <Suspense fallback={<PostsSkeleton></PostsSkeleton>}>
          <Posts loggedIn={loggedIn} userId={loggedIn?.UserId}/>
        </Suspense>
      </div>
      <div className="hidden xl:block">
        <Suspense fallback={<SuggestionsSkeleton></SuggestionsSkeleton>}>
          <FollowersSuggestion loggedUser={loggedIn} userId={loggedIn?.UserId}/>
        </Suspense>
      </div>

    </main>

    // <main className="flex w-full flex-grow">
    //   <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
    //     <Suspense fallback={<PostsSkeleton />}>
    //       <Posts />
    //     </Suspense>
    //   </div>
    // </main>
  );
}

export default DashboardPage;