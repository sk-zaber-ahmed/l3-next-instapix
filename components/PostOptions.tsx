"use client";
import { MoreHorizontal } from "lucide-react";
import { fakepost } from '@/lib/definitions';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog2"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import DeleteConfirmation from "./DeleteConfirmation";

interface Props {
    post: any;
    loggedIn: any;
}

const PostOptions = ({ post, loggedIn }: Props) => {
    const { userId } = post   //Each post has its ownerId who did the post

    //checking if the post is by loggedin user or not
    const loggedInUserId = "64eb61e611e76cab67d456de"  //we will get it from when user logged in then
    const isPostMine = userId === loggedIn;
    const router = useRouter();
    const path = `/dashboard/p/${post._id}`
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteConfimeModal = () => {
        console.log('clicked')
        setModalOpen(!modalOpen)
    }
    console.log('from post options', modalOpen)
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <MoreHorizontal className={cn(
                        "h-5 w-5 cursor-pointer dark:text-neutral-400",
                    )} />
                </DialogTrigger>
                <DialogContent className="dialogContent">

                    {isPostMine && (
                        // <form
                        //     action={async (formData: FormData) => {
                        //         const postId = formData.get("postId");
                        //         console.log(post, postId, userId);

                        //         const result = await deletePost(post, postId, userId);
                        //         console.log("result will be", result);
                        //         toast.success('Deleted successfully')
                        //         router.back()
                        //     }}
                        //     className="postOption"
                        // >
                        //     <input type="hidden" name="postId" value={post._id} />
                        //     <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">
                        //         Delete post
                        //     </SubmitButton>
                        // </form>

                        <button onClick={handleDeleteConfimeModal} className="postOption text-red-500 font-bold disabled:cursor-not-allowed w-full p-3" type="button" >
                            Delete post
                        </button>
                    )}

                    {isPostMine && (
                        <Link
                            scroll={false}
                            href={`/dashboard/p/${post._id}/edit`}
                            className="postOption p-3"
                        >
                            Edit
                        </Link>
                    )}

                    <form action="" className="postOption">
                        <button className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3">Hide ad</button>
                    </form>

                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>

                </DialogContent>
            </Dialog>


            {
                modalOpen && <DeleteConfirmation post={post} modalOpen={modalOpen} handleDeleteConfimeModal={handleDeleteConfimeModal}></DeleteConfirmation>
            }
        </>
    );
};

export default PostOptions;