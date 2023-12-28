
import FollowersSuggestion from "@/components/FollowersSuggestion";
import Posts from "@/components/Posts";
import { PostsSkeleton, SuggestionsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="grid xl:grid-cols-5 xl:gap-[50px]">

      <div className="col-span-3">
        <Suspense fallback={<PostsSkeleton></PostsSkeleton>}>
          <Posts />
        </Suspense>
      </div>
      <div className="hidden xl:block">
        <Suspense fallback={<SuggestionsSkeleton></SuggestionsSkeleton>}>
          <FollowersSuggestion />
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