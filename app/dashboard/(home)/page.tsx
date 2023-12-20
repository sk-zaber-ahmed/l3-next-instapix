
// import { PostsSkeleton } from "@/components/Skeletons";
import FollowersSuggestion from "@/components/FollowersSuggestion";
import Posts from "@/components/Posts";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="grid xl:grid-cols-2 xl:gap-[50px]">
        <Suspense>
          <div>
            <Posts />
          </div>
          <div>
            <FollowersSuggestion/>
          </div>
        </Suspense>
    </main>
  );
}

export default DashboardPage;