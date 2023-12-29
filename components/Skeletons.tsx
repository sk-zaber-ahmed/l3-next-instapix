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
            <div className="flex items-center w-full md:w-[500px] space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>

            <Skeleton className="h-[400px] lg:h-[550px]" />
        </div>
    );
}


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
}


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