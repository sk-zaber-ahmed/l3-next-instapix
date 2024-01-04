"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
import { updateUserProfile } from "@/lib/actions";
import { useState } from "react";
import ProfileImageChange from './ProfileImageChange';
import ProfileAvatar from './ProfileAvatar'

function ProfileForm({ profile, loggedUserDetail,parsedAvatar }: { profile: any, loggedUserDetail: any,parsedAvatar:string}) {
   
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            id: loggedUserDetail?.userId,
            image: profile?.image || "",
            displayName: loggedUserDetail?.displayName || "Test",
            bio: loggedUserDetail?.bio || "",
            phone: profile?.PhoneNumber || "",
            email: profile?.Email || ""
        },
    });

    //profile data comes from loggedInUser(directly from microservice)
    //loggedUserDetail comes from own InstaUser table

    const { isDirty, isSubmitting, isValid } = form.formState;

    return (
        <>
            <div className="space-y-8 py-10 lg:p-10 max-w-xl">
                <div className="flex justify-between items-center gap-x-2 md:gap-x-5 rounded-lg bg-zinc-100 dark:bg-neutral-800 p-2">
                    <div className='flex items-center gap-2'>
                        {/* <Image src={parsedAvatar} alt="profile-image" width={50} height={50} className="rounded-full object-cover" /> */}
                        <ProfileAvatar
            className="cursor-pointer"
            image={parsedAvatar}
            profileName={"Test"}
          />
                        <div>
                            <p>{profile?.FirstName}</p>
                            <p className='text-[12px] dark:text-neutral-500'>{profile?.Email}</p>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => { setOpen(!open) }} className="bg-[#1877F2] text-sm font-bold cursor-pointer hover:text-white p-2 rounded-lg">
                            Change photo
                        </button>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(async (values) => {
                            console.log(values)
                            const result = await updateUserProfile(values);
                            console.log(result)
                            toast.success("Profile updated successfully!");
                        })}
                        className="space-y-4"
                    >

                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold w-20 md:text-right">Display Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="displayName"
                                            id="displayName"
                                            placeholder="Write a caption..."
                                            {...field}
                                            className="focus:outline-none"
                                        />
                                    </FormControl>
                                    <FormDescription className=" text-xs">
                                        Set your display name.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            disabled
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold w-20 md:text-right">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="Write a caption..."
                                            {...field}
                                            className="focus:outline-none"

                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold w-20 md:text-right">
                                        Bio
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className="resize-none" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        {field.value?.length} / 150
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold w-20 md:text-right">Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="phone"
                                            id="phone"
                                            placeholder="+880"
                                            {...field}
                                            className="focus:outline-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={!isDirty || !isValid || isSubmitting}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>

            {
                open && <ProfileImageChange open={open} setOpen={setOpen}></ProfileImageChange>
            }
        </>

    );
}

export default ProfileForm;
