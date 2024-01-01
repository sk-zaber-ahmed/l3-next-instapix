"use client";

import Error from "@/components/Error";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/useMount";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImageSlider } from "./ImageSlider";
import ShadCnCarousel from "./ShadCnCarousel";
import { InfoIcon } from "lucide-react";
import { updatePost } from "@/lib/actions";

type props = {
    postId: string;
    post: any;
    parsedImages: any;
};

function EditPost({ postId, post, parsedImages }: props) {
    const {content,userId}=post?.post
    const mount = useMount();
    const pathname = usePathname();
    const isEditPage = pathname === `/dashboard/p/${postId}/edit`;
    const router = useRouter();

        const formSchema = z.object({
            caption: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })
       
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            caption: content,
          },
        })


    if (!mount) return null;

    return (
        <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-normal flex items-center gap-1'>Edit Info <InfoIcon size={18} color="gray"/></DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <div className="h-96 md:h-[400px] overflow-hidden rounded-md">
                        <AspectRatio ratio={1 / 1} className="relative h-full">
                            {/* <Image
                                    src="http://res.cloudinary.com/dshvfqndm/image/upload/v1693295751/o2wi75xbu8wbp2ql5i2b.jpg"
                                    alt="Post preview"
                                    fill
                                    className="rounded-md object-cover"
                                /> */}

                            {/* <ShadCnCarousel images={parsedImages}/> */}

                            <ImageSlider multiImage={parsedImages} images={post?.post?.files} />
                        </AspectRatio>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(async (values) => {
                            // console.log(values)
                              const res = await updatePost(values?.caption,postId, userId);
                              router.push(`/dashboard`);
                              if (res) {
                                return toast.success("Updated successfully");
                              }
                        })}
                    >
                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="caption">Caption</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="caption"
                                            id="caption"
                                            placeholder="Write a caption..."
                                            {...field}
                                            className="text-[12px] focus:outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            Done
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditPost;


