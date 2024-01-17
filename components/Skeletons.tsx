import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";

export const PostSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center w-full md:w-[600px] space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          {/* <Skeleton className="h-4 w-[250px]" /> */}
          {/*No need for location skeleton*/}
        </div>
      </div>

      <Skeleton className="h-[400px] lg:h-[500px]" />
    </div>
  );
};

export const SuggestionSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center w-full md:w-[500px] space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
};

export function PostsSkeleton() {
  return (
    <div className="flex flex-col xl:items-center space-y-3">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}

export const GridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="h-60">
        <Skeleton className="h-full w-full" />
      </Card>
      <Card className="h-60">
        <Skeleton className="h-full w-full" />
      </Card>
      <Card className="h-60">
        <Skeleton className="h-full w-full" />
      </Card>
    </div>
  );
};

export function SuggestionsSkeleton() {
  return (
    <div className="space-y-3">
      <SuggestionSkeleton />
      <SuggestionSkeleton />
      <SuggestionSkeleton />
      <SuggestionSkeleton />
    </div>
  );
}

export function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <Skeleton className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full rounded-r-none" />

        <div className="flex flex-col h-full py-4 pl-3.5 pr-6 flex-1">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <Skeleton className="flex-1 my-4" />

          <div className="flex items-center w-full space-x-4">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  );
}
