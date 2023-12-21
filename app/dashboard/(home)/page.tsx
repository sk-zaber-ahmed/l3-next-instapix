
// import { PostsSkeleton } from "@/components/Skeletons";
import FollowersSuggestion from "@/components/FollowersSuggestion";
import Posts from "@/components/Posts";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="grid xl:grid-cols-5 xl:gap-[50px]">
        <Suspense>
          <div className="col-span-3">
            <Posts />
          </div>
          <div className="hidden xl:block">
            <FollowersSuggestion/>
          </div>
        </Suspense>
    </main>
  );
}

export default DashboardPage;