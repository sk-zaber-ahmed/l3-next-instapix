"use client";

import ActionIcon from "@/components/ActionIcon";
import { Bookmark } from "lucide-react";

type Props = {
    post: any;
    userId?: string;
};

function BookmarkButton({ post, userId }: Props) {

    return (

        <ActionIcon>
            <Bookmark
                className="h-6 w-6"
            />
        </ActionIcon>
    );
}

export default BookmarkButton;