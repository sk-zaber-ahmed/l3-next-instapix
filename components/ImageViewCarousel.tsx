"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CopyPlus, Plus, XCircle } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type extendFileType = {
  name: string;
  base64: string;
};

const ImageViewCarousel = ({
  postImage,
  removeImage,
  updateUploadImageList,
}: {
  postImage: File[];
  removeImage: (fileName: string) => void;
  updateUploadImageList: (file: File[]) => void;
}) => {
  const [imagePreviews, setImagePreviews] = useState<extendFileType[]>([]);
  const [updateOverlay, setUpdateOverlay] = useState(false);
  // console.log(imagePreviews);

  const getBase64Data = (fileList: File[]) => {
    const files = fileList;

    if (files) {
      const imagePreviewsArray: extendFileType[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        // console.log(file);
        // let base64String = "";

        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const base64Data = reader.result as string; // 'result' contains the base64 string
          // base64String = base64Data; // its not possible because, the result should be string | buffer
          const newFile = { name: file?.name, base64: base64Data };
          imagePreviewsArray.push(newFile);

          if (imagePreviewsArray.length === files.length) {
            setImagePreviews(imagePreviewsArray);
          }
        };

        // console.log("Yes I Got the data", base64String);
      }
    }
  };

  const getInputData = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const inputImages: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        inputImages.push(file); // set input files
      }

      updateUploadImageList(inputImages);
    }
  };

  useEffect(() => {
    getBase64Data(postImage);
  }, [postImage]);

  return (
    <Carousel className="rounded-b-lg">
      <CarouselContent>
        {imagePreviews.length > 0 &&
          imagePreviews.map((item: extendFileType, index: number) => (
            <CarouselItem
              className="w-full h-[65vh] flex justify-center"
              key={index}
            >
              <Image
                src={item?.base64}
                alt="Post preview"
                className="object-cover h-[65vh] w-auto"
                height={100}
                width={100}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />

      {updateOverlay && (
        <div className="absolute h-[100px] w-full  right-0 left-0 bottom-[10px] -translate-y-1/2">
          <div className="grid grid-cols-12 gap-1 mx-4 bg-background/80 rounded-lg">
            <div className="col-start-1 col-span-10 overflow-hidden ms-2">
              <div className="flex items-center overflow-x-auto h-full w-full  gap-2 flex-row-reverse">
                {imagePreviews &&
                  imagePreviews.map((item: any, index: number) => (
                    <div
                      className="relative flex-shrink-0 w-[90px]"
                      key={index}
                    >
                      <Image
                        src={item?.base64}
                        alt="Post preview"
                        className="object-cover h-[90px] w-[90px] bg-gray-200"
                        height={90}
                        width={90}
                      />
                      <button
                        onClick={() => removeImage(item?.name)}
                        className="absolute top-1 right-1 bg-gray-800 rounded-full"
                      >
                        <XCircle />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-start-11 col-span-2 h-[100px] ">
              <label className="rounded-full h-[50px] w-[50px] border-slate-50/30 border-2 flex justify-center items-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={getInputData}
                  style={{ display: "none" }}
                />
                <Plus />
              </label>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setUpdateOverlay((prev) => !prev)}
        className="absolute h-8 w-8 rounded-full bg-background/80 right-[18px] bottom-[0px] -translate-y-1/2"
      >
        <CopyPlus className="ps-2" />
      </button>
    </Carousel>
  );
};

export default ImageViewCarousel;
