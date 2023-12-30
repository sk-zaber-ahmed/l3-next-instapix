// Whenever single post data is coming from server that moment loading will be shown autometically
import { ViewPostSkeleton } from "@/components/Skeletons";

function Loading() {
  return <ViewPostSkeleton />;
}

export default Loading;