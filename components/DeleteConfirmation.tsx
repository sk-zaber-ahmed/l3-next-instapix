"use client"
import React from 'react';
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
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { deletePost } from '@/lib/data';

type props = {
    post: any
    modalOpen: boolean,
    handleDeleteConfimeModal: () => void
}
const DeleteConfirmation = ({ post, modalOpen, handleDeleteConfimeModal }: props) => {
    const { userId } = post
    const router = useRouter();
    const path = `/dashboard/p/${post._id}`
    return (
        <Dialog open={modalOpen}
            onOpenChange={(isOpen) => !isOpen && router.push(`/dashboard`)}>

            <DialogContent className="dialogContent w-[400px] h-[200px]">



                <div className='px-2 flex flex-col justify-center'>
                    <h1 className="mx-auto font-normal text-sm mb-4">
                        Are you sure want to delete the post ?
                    </h1>
                    <form
                        action={async (formData: FormData) => {
                            const postId = formData.get("postId");
                            console.log(post, postId, userId);

                            const result =  await deletePost(postId as string);
                            console.log("result will be", result);
                            toast.success('Deleted successfully')
                            router.back();
                        }}
                    >
                        <input type="hidden" name="postId" value={post._id} />
                        <div className='grid grid-cols-2 gap-2'>
                            <Button type='submit' variant={"destructive"} className="text-sm font-bold disabled:cursor-not-allowed w-full p-3">
                                Confirm
                            </Button>
                            <Button className="font-bold text-sm w-full" onClick={handleDeleteConfimeModal}>
                                No
                            </Button>
                        </div>
                    </form>

                </div>


            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmation;