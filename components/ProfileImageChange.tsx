"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CreatePost } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import Image from "next/image";
import useMount from "@/hooks/useMount";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Trash, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { updateUserProfilePicture, uploadToStorage } from "@/lib/actions";

type props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProfileImageChange = ({ open, setOpen }: props) => {
    const mount = useMount();
    const form = useForm<z.infer<typeof CreatePost>>({
        resolver: zodResolver(CreatePost),
        defaultValues: {
            caption: "",
            fileUrl: undefined,
        },
    });
    const fileUrl = form.watch("fileUrl");  //whatever happens in fileUrl will be watched by the form
    const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event: any) => {

    //     const file = event.target.files[0];
    //     setSelectedFile(file);

    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             form.setValue("fileUrl", reader?.result);
    //         }
    //         reader.readAsDataURL(file);
    //     }
    // };
    const [postImage, setPostImage] = useState<File[]>([]);
    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (files) {
            const inputImages: File[] = [];

            for (let i = 0; i < files.length; i++) {
                if (!allowedTypes.includes(files[i].type)) {
                    toast.warning('Please select only image files (JPEG, PNG).');
                    event.target.value = ''; // Clear the input field
                    return;
                }
                const file = files[i];
                inputImages.push(file); // set input files

                //file read korar jnno
                const reader = new FileReader();
                reader.onload = () => {
                    form.setValue("fileUrl", reader?.result);
                }
                reader.readAsDataURL(file);
            }

            setPostImage(inputImages);
        }
    };
    console.log("post image", postImage)

    async function onSubmit(values: z.infer<typeof CreatePost>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const formData = new FormData();

        formData.append("disc", "nothing");
        postImage.map((item: File) => {
            formData.append("image", item);
        });
        console.log("form data", formData)



        const imageIds = await uploadToStorage(formData);

        const result=await updateUserProfilePicture(imageIds)
        console.log("uploaded image ids", result);
        if(result.status){
            toast.success('Profile picture updated successfully!')
            setOpen(false)
        }
    }

    const handleCloseClick = (e: any) => {
        e.stopPropagation()
        form.setValue("fileUrl", undefined);
        setSelectedFile(null);
    }
    if (!mount) return null;

    return (
        <div>
            <Dialog open={open} onOpenChange={(open) => !open && setOpen(false)}>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className={clsx('w-[400px]', {
                    'w-[250px]': fileUrl
                },
                )}>
                    <DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* if fileurl thakey then div element will be shown */}
                                {!!fileUrl ? (
                                    <div className="relative group w-[200px]">
                                        <img
                                            src={fileUrl}
                                            alt="Post preview"
                                            className="h-[200px] w-[200px] rounded-full object-cover border border-gray-300 transition-opacity duration-500 ease-in-out backface-hidden opacity-100 group-hover:opacity-30" />

                                        <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-in-out">
                                            <button onClick={handleCloseClick} className="rounded-lg">
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>

                                ) : (

                                    <FormField
                                        control={form.control}
                                        name="fileUrl"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <div className="flex justify-center mt-[50px]">
                                                    <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                                </div>
                                                <FormLabel htmlFor="picture" className='flex justify-center text-[12px]'>Drag photos and videos here</FormLabel>
                                                <FormControl>
                                                    <div className="file-uploader flex justify-center">
                                                        <label className="custom-file-upload m-[10px]">
                                                            <input
                                                                type="file"
        
                                                                accept="image/*"
                                                                onChange={handleFileInputChange}
                                                                style={{ display: 'none' }} />
                                                            Choose Photo
                                                        </label>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                )}

                                {!!fileUrl && (
                                    <div className='flex justify-center'>
                                        <Button size="sm" type="submit" disabled={form.formState.isSubmitting}>
                                            Upload<Upload className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>

                                )}


                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default ProfileImageChange;