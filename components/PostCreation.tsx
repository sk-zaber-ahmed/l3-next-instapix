"use client";

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
import useMount from "@/hooks/useMount";
import { CreatePost } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import ImageViewCarousel from "@/components/ImageViewCarousel";
import { ArrowLeft } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { uploadToStorage } from "@/lib/actions";

import { toast } from "sonner";
import ProfileAvatar from "@/components/ProfileAvatar";
import { createUserPost } from "@/lib/data";

function PostCreateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="absolute right-4 top-[10px] text-[14px] text-blue-500 font-bold hover:text-blue-600"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Pending..." : "Share"}
    </button>
  );
}

function PostCreation({
  userName,
  parsedAvatar,
}: {
  userName: any;
  parsedAvatar: any;
}) {
  const pathname = usePathname();
  const isCreatePage = pathname === "/dashboard/create";
  const router = useRouter();
  const mount = useMount();
  const [stage, setStage] = useState<number>(0);
  const [postImage, setPostImage] = useState<File[]>([]); // post's image list
  const [postDist, setPostDist] = useState<string>(""); // post's description

  const [postData, dispatch] = useFormState(imageUploadFunc, undefined);
  // console.log("data comming from action", postData);

  async function imageUploadFunc(values: z.infer<typeof CreatePost>) {
    try {
      const formData = new FormData();

      formData.append("disc", postDist);
      postImage.map((item: File) => {
        formData.append("image", item);
      });

      const imageIds = await uploadToStorage(formData);

      const data = {
        files: imageIds,
        content: postDist,
      };
      const postCreate = await createUserPost(data);
      //console.log('create response',postCreate)

      toast.success("Successfully created post");
      router.push("/dashboard");
      return imageIds;
    } catch (error) {
      toast.warning("Failed to create post");
    }
  }

  const updateStage = () => {
    if (stage === 0) {
      setStage(1);
    }
    if (stage === 1) {
      dispatch();
    }
  };

  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      fileUrl: undefined,
    },
  });

  const handleDistInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPostDist(event.target.value);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const inputImages: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        inputImages.push(file); // set input files
      }

      setPostImage(inputImages);
    }
  };

  const removeImage = (fileName: string) => {
    setPostImage((prev) => prev.filter((item) => item.name !== fileName));
  };

  const updateUploadImageList = (file: File[]) => {
    setPostImage((prev) => [...prev, ...file]);
  };

  if (!mount) return null; //this prevents the hydration issue when component is mounted then the Dialog component is rendered

  return (
    <Dialog
      open={isCreatePage}
      onOpenChange={(open) => !open && router.back()} //router.back()=>go back to previous route
    >
      <DialogContent
        style={{
          minWidth: "100dvw",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bg-black/20"
      >
        <div
          className={`flex flex-col border-2 rounded-lg border-border bg-white dark:bg-black w-full md:w-[70%]
          ${stage === 1 ? "lg:w-[70%]" : "lg:w-[50%]"}
          `}
        >
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-[16px] py-2">
              Create new post
            </DialogTitle>

            {postImage.length > 0 &&
              (stage === 0 ? (
                <button
                  onClick={updateStage}
                  className="absolute right-2 top-[4px] text-[14px] text-blue-500 font-bold hover:text-blue-600 "
                >
                  {stage === 0 ? "Next" : "Share"}
                </button>
              ) : (
                <form action={dispatch}>
                  <PostCreateButton />
                </form>
              ))}

            {stage !== 0 && (
              <button
                onClick={() => setStage((prev) => prev - 1)}
                className="absolute left-2 top-[4px] text-[14px]"
              >
                <ArrowLeft />
              </button>
            )}
          </DialogHeader>
          <Separator className="bg-foreground" />

          <div
            className={`flex items-center justify-center rounded-b-lg w-full h-full overflow-hidden`}
          >
            {/* image pick area */}
            <div
              className={`${
                stage === 0 ? "w-full" : "lg:w-1/2 md:hidden lg:block"
              }`}
            >
              {postImage.length > 0 ? (
                <ImageViewCarousel
                  postImage={postImage}
                  removeImage={removeImage}
                  updateUploadImageList={updateUploadImageList}
                />
              ) : (
                <Form {...form}>
                  <form className="">
                    {/* if fileurl exists then div element will be shown */}

                    <FormField
                      control={form.control}
                      name="fileUrl"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <div className="flex justify-center mt-[50px]">
                            <svg
                              aria-label="Icon to represent media such as images or videos"
                              className="x1lliihq x1n2onr6 x5n08af"
                              fill="currentColor"
                              height="77"
                              role="img"
                              viewBox="0 0 97.6 77.3"
                              width="96"
                            >
                              <title>
                                Icon to represent media such as images or videos
                              </title>
                              <path
                                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <FormLabel
                            htmlFor="picture"
                            className="flex flex-col items-center justify-center text-[18px]"
                          >
                            Please upload image in one of the following formats: (JPG, PNG).
                            <p className='text-red-600 text-[12px]'>The file size should not exceed 100KB</p>
                          </FormLabel>
                          <FormControl>
                            <div className="file-uploader flex justify-center">
                              <label className="custom-file-upload m-[30px]">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleFileInputChange}
                                  style={{ display: "none" }}
                                />
                                Choose Photo
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </div>

            {/* post's detail area */}
            <div
              className={`${
                stage === 0 ? "hidden" : "lg:w-1/2 md:w-full"
              } h-[65vh]`}
              // style={{ border: "2px solid red" }}
            >
              <div className="w-full flex items-center gap-3 p-4">
                <div>
                  <ProfileAvatar
                    image={parsedAvatar?.Url}
                    profileName={userName}
                  />
                </div>
                <div>{userName}</div>
              </div>
              <div className=" m-4">
                <textarea
                  style={{ resize: "none" }}
                  name="description"
                  id="post_dist"
                  rows={10}
                  onChange={handleDistInputChange}
                  className=" p-4 w-full bg-inherit placeholder:text-black dark:placeholder:text-white focus-visible:outline-none "
                  placeholder="Write a caption..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostCreation;
